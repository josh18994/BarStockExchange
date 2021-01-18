const mongoose = require('mongoose');

async function run() {
    const uri = "mongodb+srv://joshua:enqzElyXMVy6KYJY@cluster0.huuxj.mongodb.net/liquor?retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('connected');
    await mongoose.connection.createCollection('OrdersChangeStream');


    const ordersSchema = new mongoose.Schema({
        user_Id: String,
        products: {
            price: String,
            liquor: mongoose.Types.ObjectId,
            quantity: Number
        },
        date: Date
    });

    const Orders = mongoose.model('Orders', ordersSchema, 'Orders');

    const ordersCSSchema = new mongoose.Schema({
        itemName: String,
        itemId: String,
        price: String,
        quantity: String
    });
    const ordersCS = mongoose.model('OrdersChangeStream', ordersCSSchema, 'OrdersChangeStream');
    // const collection = mongoose.db("liquor").collection("orders");
    const pipeline = [{ $match: { 'ns.db': 'liquor', 'ns.coll': 'orders' } }];

    Orders.watch(pipeline).on('change', async (data) => {
        const newOrder = data.fullDocument;
        console.log(newOrder);
    })

}

run().catch(console.error);