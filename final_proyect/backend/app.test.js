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


