const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, getAllUsers, getUser, updateUser, deleteUser } = require("./userController");
const { createTicket, getAllTickets, deleteTicket, getTicket, updateTicket, } = require("./ticketController");
const { getDropdown } = require("./dropdownController");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const { priorityChart, classroomChart, incidentsChart } = require('./reportController');

// Declare app and port
const app = express()
const port = 3011

const privateKey = fs.readFileSync('./keys/private.key');
const certificate = fs.readFileSync('./keys/server.crt');

const credentials = {
    key: privateKey,
    cert: certificate,
};


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

// Register and Login File (userController.js)
app.post("/users", async (request, response) => {
    registerUser(request, response, db, bcrypt, jwt);
})

app.get("/users", async (request, response) => {
    getAllUsers(request, response, db, jwt);
})

app.post("/login", async (request, response) => {
    loginUser(request, response, db, bcrypt, jwt);
})

app.get("/users/:id", async (request, response) => {
    getUser(request, response, db, jwt);
})

app.put("/users/:id", async (request, response) => {
    updateUser(request, response, db, bcrypt, jwt);
});

app.delete("/users/:id", async (request, response) => {
    deleteUser(request, response, db, jwt);
});

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

app.put("/tickets/:id", async (request, response) => {
    updateTicket(request, response, db, jwt);
}
);

app.get("/tickets/:id", async (request, response) => {
    getTicket(request, response, db, jwt);
})

// Getdropdown File (dropdownController.js)
app.get("/dropdown/:collection", async (request, response) => {
    getDropdown(request, response, db, jwt);

})

// Report File (reportController.js)
app.get("/report/pie/:collection", async (request, response) => {
    priorityChart(request, response, db, jwt);
})

app.get("/report/classroom/:collection", async (request, response) => {
    classroomChart(request, response, db, jwt);
});

app.get("/report/incidents", async (request, response) => {
    incidentsChart(request, response, db, jwt);
});
// Start server
https.createServer(credentials, app).listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})

module.exports.app = app; // for testing
module.exports.connectDB = connectDB; // for testing



