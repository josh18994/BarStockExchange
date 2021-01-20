const { MongoClient } = require('mongodb');
const fetch = require('node-fetch');

var allLiquorInfo = [];
var token = "";
var user = "";

async function main() {
    const uri = "mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {

        await client.connect();

        await login();

        await getTop16Items();

        await startScript();

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

async function getTop16Items() {
    const getAllLiquor = {
        "query": `
            query {
                getAllLiquor(options: { pageSize: "16", pageNum: ""})
                    { 
                        data {
                            _id
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
}

async function startScript() {
    console.log('starting...');
    const headers = generateHeaders();
    while (true) {
        const randomNumber = Math.floor(Math.random() * (15 - 0 + 1) + 0);
        const randomLiquor = allLiquorInfo[randomNumber];
        const getLiquorPriceQuery = {
            "query": `query{getLiquorById(id:\"${randomLiquor._id}\"){info{name},price{currentPrice}}}`
        }
        const fetchLiquorPrice = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(getLiquorPriceQuery),
            headers: { 'Content-Type': 'application/json' }
        });
        const fetchDataJson = await fetchLiquorPrice.json();
        // console.log(fetchDataJson.data.getLiquorById.price.currentPrice);
        const price = fetchDataJson.data.getLiquorById.price.currentPrice;
        const checkoutUserQuery = {
            "query": `mutation{checkoutUserCart(products:[{quantity:\"1\",liquor:\"${randomLiquor._id}\",price:\"${price}\"}])}`
        }
        const checkoutUser = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(checkoutUserQuery),
            headers
        });
        const checkoutUserJson = await checkoutUser.json();
        console.log(checkoutUserJson.data?.checkoutUserCart);
        if(checkoutUserJson.data?.checkoutUserCart === "Checkout Success") {
            console.log("User " + user + " checked out item " + fetchDataJson.data.getLiquorById.info.name + " for $" + price);
        }
        await new Promise(resolve => setTimeout(resolve, 2200));
    }
}

function generateHeaders() {
    return {
        'Content-Type': 'application/json',
        'Cookie': `Authentication=${token}`
    }
}

main().catch(console.error);