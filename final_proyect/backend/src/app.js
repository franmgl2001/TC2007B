const express = require('express')
const app = express()
const port = 3011
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require("./userController");
const { createTicket, getAllTickets, deleteTicket, getTicket } = require("./ticketController");
const { getDropdown } = require("./dropdownController");
const cors = require('cors');



app.use(bodyParser.json());
app.use(cors());


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

// Ticket File (ticketController.js)
app.post("/tickets", async (request, response) => {
    createTicket(request, response, db, jwt);
})

app.get("/tickets", async (request, response) => {
    getAllTickets(request, response, db, jwt);
})

app.delete("/tickets/:id", async (request, response) => {
    deleteTicket(request, response, db, jwt);
}
);


//getOne
app.get("/tickets/:id", async (request, response) => {
    getTicket(request, response, db, jwt);
})

// Getdropdown File (dropdownController.js)
app.get("/dropdown/:collection", async (request, response) => {
    getDropdown(request, response, db, jwt);
})
app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})

module.exports.app = app; // for testing
module.exports.connectDB = connectDB; // for testing

