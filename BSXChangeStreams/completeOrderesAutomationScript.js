const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');

var allLiquorInfo = [];
var liquorInfoWithOriginalPrice24hrs = {};
var token = "";
var user = "";

async function main() {
    const uri = "mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {

        await client.connect();

        await login();

        await getTop16Items(true);

        // testingArea();

        await startSmartScript();

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
                                user {
                                    username
                                }
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
            user = json.data.login.user.username;
            console.log('login successful');
        });
}

async function getTop16Items(first = false) {
    const getAllLiquor = {
        "query": `
            query {
                getAllLiquor(options: { pageSize: "17", pageNum: ""})
                    { 
                        data {
                            _id
                            info {
                                name
                            }
                            price {
                                history {
                                    price
                                    date
                                }
                                currentPrice
                            }
                        }
                    }
                }
        `
    }
    const fetchData = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(getAllLiquor),
        headers: { 'Content-Type': 'application/json' }
    });
    const fetchDataJson = await fetchData.json();
    allLiquorInfo = fetchDataJson.data.getAllLiquor.data;

    if (first) {
        console.log(allLiquorInfo);
        allLiquorInfo.forEach(element => {

            const currentPrice = !element.price.history?.length ?
                element.price.currentPrice : element.price?.history.filter(x => new Date(x.date).getDay() === new Date().getDay())[0].price;
            liquorInfoWithOriginalPrice24hrs[element._id] = {
                ...element,
                price: {
                    ...element.price,
                    currentPrice
                }
            }
            if(element._id.toString() === '5ff65a0951d1b04464520eeb') console.log(liquorInfoWithOriginalPrice24hrs[element._id]);
        });
    }
}

async function startSmartScript() {
    const headers = generateHeaders();
    while (true) {

        console.log('---------------------------------------------------------------------------------------------------------------------------');
        console.log('\n');
        console.log('starting targeted product checkout...')
        await getTop16Items();
        const cheapestLiquor = allLiquorInfo.filter(x => {
            const originalPrice = +liquorInfoWithOriginalPrice24hrs[x._id].price.currentPrice;
            const value = ((+x.price.currentPrice - originalPrice) / originalPrice) * 100;
            // console.log(value);
            if (value < -10) {
                return x;
            }
        })
            .sort((a, b) => {
                const originalPriceA = +liquorInfoWithOriginalPrice24hrs[a._id].price.currentPrice;
                const valueA = ((+a.price.currentPrice - originalPriceA) / originalPriceA) * 100;
                const originalPriceB = +liquorInfoWithOriginalPrice24hrs[b._id].price.currentPrice;
                const valueB = ((+b.price.currentPrice - originalPriceB) / originalPriceB) * 100;
                if (valueA < valueB) {
                    return -1;
                }
                if (valueA > valueB) {
                    return 1;
                }
                return 0;
            });

            console.log(cheapestLiquor);

        if (cheapestLiquor.length) {
            let checkoutSmartLiqQS = '[';
            cheapestLiquor.forEach((liquor, index) => {
                // queries += `update${index}: updateLiquor(id: \"${liquor._id}\", options: { price: { currentPrice: \"${liquor.price.currentPrice}\" }}) { _id, price {currentPrice}, info{name}, frequency } \n`;
                checkoutSmartLiqQS += `{quantity:\"1\", liquor:\"${liquor._id}\", price:\"${liquor.price.currentPrice}\"}, \n`
            });

            checkoutSmartLiqQS += ']';
            console.log(checkoutSmartLiqQS);

            const checkoutSmartLiqQ = {
                "query": `
                mutation {
                    checkoutUserCart(products:${checkoutSmartLiqQS})
                }
                `
            }

            const checkoutSmartUser = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(checkoutSmartLiqQ),
                headers
            });
            const checkoutSmartUserJson = await checkoutSmartUser.json();
            console.log(checkoutSmartUserJson);
        } else {
            console.log('Could not find valuable liquor product');
        }


        // ---------------------------------------------------------------------------------------------------------------------------


        console.log('\n ');
        console.log('starting random product checkout...');

        const generateRandomNumber = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        let getLiquorQueryString = '';
        const randomNumberOfRequests = generateRandomNumber(3, 5);
        for (let index = 1; index <= randomNumberOfRequests; index++) {
            const randomLiquor = allLiquorInfo[generateRandomNumber(0, 15)];
            getLiquorQueryString += `query${index}: getLiquorById(id:\"${randomLiquor._id}\"){_id,info{name},price{currentPrice}} \n`
        }

        const getLiquorPriceQuery = {
            "query": `query{${getLiquorQueryString}}`
        }
        const fetchLiquorPrice = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(getLiquorPriceQuery),
            headers: { 'Content-Type': 'application/json' }
        });
        const fetchDataJson = await fetchLiquorPrice.json();
        const liquorArray = Object.values(fetchDataJson.data);

        let checkoutRanLiqQStr = '';
        liquorArray.forEach((item, index) => {
            checkoutRanLiqQStr += `update${index}: checkoutUserCart(products:[{quantity:\"1\",liquor:\"${item._id}\",price:\"${item.price.currentPrice}\"}]) \n`
        })
        const checkoutRanLiqQ = {
            "query": `mutation{${checkoutRanLiqQStr}}`
        }
        console.log(checkoutRanLiqQStr);
        const checkoutRanUser = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(checkoutRanLiqQ),
            headers
        });
        const checkoutRanUserJson = await checkoutRanUser.json();
        console.log(checkoutRanUserJson);
        console.log('\n');
        await new Promise(resolve => setTimeout(resolve, 2200));
    }

}

main().catch(console.error);