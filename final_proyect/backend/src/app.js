const express = require('express')
const app = express()
const port = 3011
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require("./userController");
const { createTicket } = require("./ticketController");


app.use(bodyParser.json());

let db;
// DB Connection
async function connectDB() {
    let client = new MongoClient("mongodb://localhost:27017/PorMexicoDev")
    await client.connect();
    db = client.db();
    return db;
}

// APIs
app.post("/create/tickets", async (request, response) => {
    let addValue = request.body;
    db = await connectDB();
    data = await db.collection('tickets').insertOne(addValue);
    response.json({ "statusCode": 200 });
})
// Register and Login File (userController.js)
app.post("/register", async (request, response) => {
    registerUser(request, response, db, bcrypt);
})

app.post("/login", async (request, response) => {
    loginUser(request, response, db, bcrypt, jwt);
})

app.post("/create/ticket", async (request, response) => {
    createTicket(request, response, db, jwt);
})

app.get("/tickets/:id", async (request, response) => {
})
app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})

module.exports.app = app; // for testing
module.exports.connectDB = connectDB; // for testing

