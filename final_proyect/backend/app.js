const express = require('express')
const app = express()
const port = 3011
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());

let db;

async function connectDB() {
    let client = new MongoClient("mongodb://localhost:27017/PorMexicoDev")
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

app.post("/register", async (request, response) => {
    let user = request.body.username;
    let pass = request.body.password;
    let fname = request.body.fullName;
    let email = request.body.email;
    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        try {
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(pass, salt, async (error, hash) => {
                    let usuarioAgregar = { "username": user, "password": hash, "fullName": fname, "email": email };
                    data = await db.collection("username").insertOne(usuarioAgregar);
                    response.sendStatus(201);
                })
            })
        } catch {
            response.sendStatus(401);
        }
    } else {
        response.sendStatus(401)
    }
})


app.post("/login", async (request, response) => {
    let user = request.body.username;
    let pass = request.body.password;
    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        response.sendStatus(401);
    } else {
        bcrypt.compare(pass, data.password, (error, result) => {
            if (result) {
                let token = jwt.sign({ usuario: data.usuario }, "secretKey", { expiresIn: 600 });
                response.json({ "token": token, "id": data.usuario, "fullName": data.fullName })
            } else {
                response.sendStatus(401)
            }
        })
    }
})


app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})

module.exports.app = app; // for testing
module.exports.connectDB = connectDB; // for testing