const express = require('express')
const app = express()
const port = 3011
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());

let db;

app.get('/test', (req, res) => {
    res.send("Hello world");

})

async function connectDB() {
    let client = new MongoClient("mongodb://localhost:27017/tc2007b")
    await client.connect();
    db = client.db();
    return db;
}

app.post("/create/tickets", async (request, response) => {
    let addValue = request.body;
    db = await connectDB();
    data = await db.collection('tickets').insertOne(addValue);
    response.json({ "statusCode": 200 });
})


app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})

module.exports.app = app; // for testing
module.exports.connectDB = connectDB; // for testing