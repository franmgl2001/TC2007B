const request = require('supertest');
const { app } = require('./app');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZnJhbm1nbCIsInBlcm1pc3Npb25zIjoiQWRtaW4iLCJpYXQiOjE2OTc3Nzc4MjksImV4cCI6MTY5ODEzNzgyOX0.bHjgNYOEMeyWL1bGyG17iL3DmpfW7OFFM51p6gt2LAs"



// Login and register tests
test("Get users", async () => {
    console.log(token);
    const response = await request(app).get("/usuarios").set("Authentication", token);
    console.log(response.status);
    expect(response.status).toBe(200);
}, 5000);