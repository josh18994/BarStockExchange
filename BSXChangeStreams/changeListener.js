const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const stream = require('stream');
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
            const liquorInfo = [...json.data.getAllLiquor.data];
            maxFrequency = Math.max(...liquorInfo.map(x => x.frequency));
            allLiquorInfo = liquorInfo.map(x => {
                const popularity = +(x.frequency / maxFrequency).toFixed(4);
                x.popularity = popularity;
                return x;
            }).sort((a, b) => (a.popularity < b.popularity) ? 1 : -1);
            formulateStrategy(allLiquorInfo);
            // console.log(json.data.getAllLiquor.data)
        })

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
        if (product.updateDescription.updatedFields?.frequency % 10 === 0) {
            const reducedLiquorPriceInfo = formulateStrategy(allLiquorInfo);
            const newLiquorPrice = calculateNewPrice(product.documentKey._id, allLiquorInfo);
            const updateliquor = {
                "query": `
                    mutation {
                        updateA: updateLiquor(id: \"${product.documentKey._id}\", options: { price: { currentPrice: \"${newLiquorPrice}\" }}) { _id }
                        updateB: updateLiquor(id: \"${reducedLiquorPriceInfo._id}\", options: { price: { currentPrice: \"${reducedLiquorPriceInfo.price}\" }}) { _id }
                    }
                `
            }
            const headers = generateHeaders();
            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(updateliquor),
                headers
            }).then(res => res.json())
                .then(json => {
                    console.log(json)
                })
        }
    }
}


function formulateStrategy(allLiquorInfo) {
    const found = allLiquorInfo.find((element, index) => element.popularity === 0 && index < 5);
    const payload = {
        _id: found ? found._id : allLiquorInfo[0]._id,
        price: found
            ? (found.price.currentPrice - (0.03 * found.price.currentPrice)).toFixed(2).toString()
            : (allLiquorInfo[0].price.currentPrice - (0.03 * allLiquorInfo[0].price.currentPrice)).toFixed(2).toString()
    }

    return payload;
}

function calculateNewPrice(_id, allLiquorInfo) {
    currentPrice = +allLiquorInfo.filter(x => x._id === _id.toString())[0].price.currentPrice;
    return (currentPrice + (0.05 * currentPrice)).toFixed(2).toString();
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

// async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []) {
//     const collection = client.db("liquor").collection("orders");
//     const changeStream = collection.watch(pipeline);
//     changeStream.on('change', (next) => {
//         console.log(next);
//     });

//     await closeChangeStream(timeInMs, changeStream);
// }

// async function monitorListingsUsingStreamAPI(client, timeInMs = 60000, pipeline = []) {
//     const collection = client.db("liquor").collection("orders");
//     const changeStream = collection.watch(pipeline);
//     changeStream.pipe(
//         new stream.Writable({
//             objectMode: true,
//             write: function (doc, _, cb) {
//                 console.log(doc);
//                 cb();
//             }
//         })
//     );
//     await closeChangeStream(timeInMs, changeStream);
// }


// function closeChangeStream(timeInMs = 60000, changeStream) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Closing the change stream");
//             changeStream.close();
//             resolve();
//         }, timeInMs)
//     })
// };




// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority"
// MongoClient.connect(uri, function (err, client) {
//     if (err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//     }
//     console.log('Connected...');
//     const collection = client.db("liquor").collection('orders');
//     const changeStreamCursor = collection.watch();

//     changeStreamCursor.on('change', next => {
//         // process next document
//         console.log(next);
//       });

//     // perform actions on the collection object
//     client.close();
// });



// conn = new Mongo('mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority');

// db = conn.getDB('liquors');
// collection = db.sensorData;


// const changeStreamCursor = collection.watch()

