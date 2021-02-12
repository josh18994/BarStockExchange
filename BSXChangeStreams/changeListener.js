const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');

var token = "";


async function main() {
    const uri = "mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // await  login

        await login();

        // Make the appropriate DB calls
        await monitorListingsUsingHasNext(client);

    } finally {
        await client.close();
    }
}

function generateHeaders() {
    return {
        'Content-Type': 'application/json',
        'Cookie': `Authentication=${token}`
    }
}


async function login() {
    const credentials = {
        username: "backendBSXPriceChanger",
        password: "]gk]V/dz%NA2)Rx="
    }
    const loginMutation = {
        "query": `
                    mutation {
                        login(inputCredentials: {username: \"${credentials.username}\", password: \"${credentials.password}\" })
                            { 
                                token
                            }
                            
                        }
                `
    }
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(loginMutation),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => {
            token = json.data.login.token;
            console.log('login successful');
        });
}


async function monitorListingsUsingHasNext(client, pipeline = []) {

    let allLiquorInfo = [];
    let maxFrequency = 0;
    // Get all Liquors and store in variable
    const getAllLiquor = {
        "query": `
            query {
                getAllLiquor(options: { pageSize: "50", pageNum: ""})
                    { 
                        data {
                            _id,
                            price {
                                currentPrice
                                history {
                                    price
                                    date
                                }
                            },
                            info {
                                name
                            }
                            frequency
                        }
                    }
                }
        `
    }

    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(getAllLiquor),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .then(json => {
            allLiquorInfo = [...json.data.getAllLiquor.data].map(x => {
                x.lastUpdatedFrequency = x.frequency;
                return x;
            });
        });

    pipeline = [{
        $match: {
            $and: [
                { "updateDescription.updatedFields.frequency": { $exists: true } },
                { operationType: "update" }
            ]
        }
    }];

    const collection = client.db("liquor").collection("liquors");
    const changeStream = collection.watch(pipeline);
    while (await changeStream.hasNext()) {
        const product = await changeStream.next();
        let updateCriteria = false;
        allLiquorInfo.map(x => {
            if(x._id === product.documentKey._id.toString()) {
                x.frequency = product.updateDescription.updatedFields?.frequency;
                updateCriteria = (product.updateDescription.updatedFields?.frequency - x.lastUpdatedFrequency >= 2);
            }
        });
        if (updateCriteria) {
            const reducedLiquorPriceInfo = findLeastPopularItemInTop16(allLiquorInfo);
            const newLiquorPrice = calculateNewPrice(product.documentKey._id, allLiquorInfo);
            const updateliquor = newLiquorPrice ? {
                "query": `
                    mutation {
                        updateA: updateLiquor(id: \"${product.documentKey._id}\", options: { price: { currentPrice: \"${newLiquorPrice}\" }}) { _id, price {currentPrice}, info{name}, frequency }
                        updateB: updateLiquor(id: \"${reducedLiquorPriceInfo._id}\", options: { price: { currentPrice: \"${reducedLiquorPriceInfo.price}\" }}) { _id, price {currentPrice}, info{name}, frequency }
                    }
                `
            } : {
                "query": `
                    mutation {
                        updateB: updateLiquor(id: \"${reducedLiquorPriceInfo._id}\", options: { price: { currentPrice: \"${reducedLiquorPriceInfo.price}\" }}) { _id, price {currentPrice}, info{name}, frequency }
                    }
                `
            };
            const headers = generateHeaders();
            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(updateliquor),
                headers
            }).then(res => res.json())
                .then(json => {
                    allLiquorInfo.forEach(x => {
                        if (x._id === json.data.updateA?._id) {
                            console.log('price of ' + json.data.updateA.info.name + ' changed from $' + x.price.currentPrice + ' to $' + json.data.updateA.price.currentPrice);
                            x.price.currentPrice = json.data.updateA.price.currentPrice;
                            x.lastUpdatedFrequency = x.frequency;
                        }
                        if (x._id === json.data.updateB?._id) {
                            console.log('price of ' + json.data.updateB.info.name + ' changed from $' + x.price.currentPrice + ' to $' + json.data.updateB.price.currentPrice);
                            x.price.currentPrice = json.data.updateB.price.currentPrice;
                            x.lastUpdatedFrequency = x.frequency;
                        }
                    });
                })
        }
    }
}

function getOriginalPrice(allLiquorInfo, _id) {
    const data = allLiquorInfo.find(x => x._id === _id);
    if(!data.price?.history?.length) return data.price.currentPrice;
    const dataFilter = data.price.history.filter(item => new Date(item.date).getDay() === new Date().getDay());
    const originalPrice = dataFilter.sort((a,b) => Date.parse(a) - Date.parse(b))[0].price;
    return originalPrice;
}


function findLeastPopularItemInTop16(allLiquorInfo) {
    const top16 = allLiquorInfo.slice(0, 16).sort((a, b) => (a.frequency > b.frequency) ? 1 : -1);
    const leastPopularItemWhosValueCanBeReduced = top16.find(x => {
        const getOriginalPriceValue = getOriginalPrice(allLiquorInfo, x._id);
        const difference = Math.abs(getOriginalPriceValue - x.price.currentPrice);
        const maxValue = 0.33 * getOriginalPriceValue;
        if(+difference <= +maxValue) {
            return x;
        }
    })
    return {
        _id: leastPopularItemWhosValueCanBeReduced._id,
        price: (leastPopularItemWhosValueCanBeReduced.price.currentPrice - (0.02 * leastPopularItemWhosValueCanBeReduced.price.currentPrice)).toFixed(2)
    }
}

function calculateNewPrice(_id, allLiquorInfo) {
    const currentPrice = +allLiquorInfo.filter(x => x._id === _id.toString())[0].price.currentPrice;
    const modifiedPrice = (currentPrice + (0.03 * currentPrice))
    const originalPrice = getOriginalPrice(allLiquorInfo, _id.toString());
    const difference = Math.abs(modifiedPrice - +originalPrice);
    if(difference >= (originalPrice * 0.50)) {
        return "";
    }
    return (currentPrice + (0.03 * currentPrice)).toFixed(2).toString();
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);