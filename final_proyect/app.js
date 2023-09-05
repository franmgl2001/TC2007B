const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');


const app = express();
const port = 3008;
const uri = 'mongodb://localhost:27017/prueba';
const dbName = 'test';
let db
const saltRounds = 10;


// Start of MongoDB code
async function connectDB() {
    let client = new MongoClient(uri);
    await client.connect();
    db = client.db("prueba");
}

app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`)
});

app.post('/register', async (req, res) => {
    console.log(req)
    const username = req.username;
    const password = req.password;
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await db.collection('usuarios').insertOne({
        email: username,
        password: hash
    });
    res.json(result);
}
);




