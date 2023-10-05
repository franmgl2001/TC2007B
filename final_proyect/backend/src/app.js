const express = require('express')
const app = express()
const port = 3011
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require("./userController");
const { createTicket } = require("./ticketController");
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
    console.log("Create Ticket")
    createTicket(request, response, db, jwt);
})

//getList, getMany, getManyReference
app.get("/tickets", async (request, response) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        console.log(verifiedToken.user);
        let authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        console.log(authData);
        let parametersFind = {}
        if (authData.permissions == "Coordinador") {
            parametersFind["usuario"] = verifiedToken.usuario;
        }

        if ("_sort" in request.query) {
            let sortBy = request.query._sort;
            let sortOrder = request.query._order == "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {}
            sorter[sortBy] = sortOrder
            let data = await db.collection('tickets').find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            data = data.slice(start, end)
            response.json(data);
        } else if ("id" in request.query) {
            let data = []
            for (let index = 0; index < request.query.id.length; index++) {
                let dataObtain = await db.collection('tickets').find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                data = await data.concat(dataObtain)
            }
            response.json(data);
        } else {
            let data = []
            data = await db.collection('tickets').find(request.query).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            response.json(data)
        }
    } catch {
        response.sendStatus(401);
    }
})

//getOne
app.get("/tickets/:id", async (request, response) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("usuarios").findOne({ "usuario": verifiedToken.usuario })
        let parametersFind = { "id": Number(request.params.id) }
        if (authData.permissions == "Coordinador") {
            parametersFind["usuario"] = verifiedToken.usuario;
        }
        let data = await db.collection('tickets').find(parametersFind).project({ _id: 0 }).toArray();
        log(verifiedToken.usuario, "ver objeto", request.params.id)
        response.json(data[0]);
    } catch {
        response.json({});
    }
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

