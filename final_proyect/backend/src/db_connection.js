const { MongoClient } = require('mongodb');

async function connectDB() {
    let client = new MongoClient("mongodb://localhost:27017/tc2007b")
    await client.connect();
    db = client.db();
}


module.exports = connectDB;