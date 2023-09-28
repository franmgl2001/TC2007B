const request = require('supertest');
const { app } = require('./app');

test('If api post works', async () => {
    const postData = {
        "id": 1,
        "Ticket_Name": "Wassa2"
    };
    const response = await request(app)
        .post('/create/tickets')
        .send(postData);

    expect(response.status).toBe(200);
});

// Login and register tests
test("Check if register same username returns 401", async () => {
    const postData = {
        "username": "test3",
        "password": "yruiwhcd",
        "fullName": "Francisco Martinez Gallardo",
        "email": "test@tes2.io"
    };
    const response = await request(app)
        .post('/register')
        .send(postData);

    expect(response.status).toBe(401);
});

test("Check if invalid login returns 401", async () => {
    const postData = {
        "username": "test3",
        "password": "notthepassword",
    };
    const response = await request(app)
        .post('/login')
        .send(postData);

    expect(response.status).toBe(401);
});

test("Check if valid login returns 200", async () => {
    const postData = {
        "username": "test3",
        "password": "yruiwhcd",
    };
    const response = await request(app)
        .post('/login')
        .send(postData);

    expect(response.status).toBe(200);
});