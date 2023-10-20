const request = require('supertest');
const { app } = require('./app');
const { text } = require('body-parser');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6IkFkbWluIiwiaWF0IjoxNjk3ODIzMjc4LCJleHAiOjE2OTgxODMyNzh9.IvK40AYN4GZZo-WSHV-JOqLdWbopAMteHpB_wI4PIaw"


test("Check testing", async () => {
    const collection = "Prioridad";
    const response = await request(app).get(`/dropdown/${collection}`).set("Authentication", token);
    expect('').toBe('');
}, 5000);

test("Test crud users", async () => {
    // Make a post request to create a usuarios
    const responseCreate = await request(app).post("/usuarios").send({
        "username": "test",
        "password": "test1234",
        "fullName": "test",
        "email": "fwhfiehfe",
        "permissions": "Admin"
    }).set("Authentication", token);

    expect(responseCreate.status).toBe(200);


    const responseGet = await request(app).get("/usuarios").set("Authentication", token);
    expect(responseGet.status).toBe(200);

    // Get last id 
    const lastId = responseGet.body[responseGet.body.length - 1].id;

    // Make a get request to get the last id
    const responseGetId = await request(app).get(`/usuarios/${lastId}`).set("Authentication", token);
    expect(responseGetId.status).toBe(200);

    // Edit mail of last id
    const responseEdit = await request(app).put(`/usuarios/${lastId}`).send({
        "email": "hola123"
    }).set("Authentication", token);

    expect(responseEdit.status).toBe(200);

    // Delete last id

    const responseDelete = await request(app).delete(`/usuarios/${lastId}`).set("Authentication", token);
    expect(responseDelete.status).toBe(200);

}, 5000);


test("Test crud tickets", async () => {

    // Make a post request to create a ticket
    const responseCreate = await request(app).post("/tickets").send({
        "Categoría": "Recursos Humanos",
        "SubCategoría": "Salud",
        "Prioridad": "Baja",
        "Status": "En proceso",
        "Aula": "CDMX Centro",
        "Fecha de Incidente": "2023-10-12",
        "Fecha de Resolución": "2023-10-12",
        "NumeroOficio": "75785458",
        "Proceso": "hjvhfuyf",
        "Comentario": "vhuyv",
        "Resolución": "jvhvvui",
    }
    ).set("Authentication", token);

    expect(responseCreate.status).toBe(200);

    // Get all tickets
    const responseGet = await request(app).get("/tickets").set("Authentication", token);
    expect(responseGet.status).toBe(200);

    // Get last id
    const lastId = responseGet.body[responseGet.body.length - 1].id;

    // Get last id ticket
    const responseGetId = await request(app).get(`/tickets/${lastId}`).set("Authentication", token);
    expect(responseGetId.status).toBe(200);

    // Edit last id ticket
    const responseEdit = await request(app).put(`/tickets/${lastId}`).send({
        "Prioridad": "Alta",
    }).set("Authentication", token);
    expect(responseEdit.status).toBe(200);

    // Delete last id ticket
    const responseDelete = await request(app).delete(`/tickets/${lastId}`).set("Authentication", token);
    expect(responseDelete.status).toBe(200);

}, 5000);



test("Test reports", async () => {
    const response = await request(app).get("/report/pie/Prioridad").set("Authentication", token);
    expect(response.status).toBe(200);

    const response2 = await request(app).get("/report/classroom/Prioridad").set("Authentication", token);
    expect(response2.status).toBe(200);

    const response3 = await request(app).get("/report/incidents").set("Authentication", token);
    expect(response3.status).toBe(200);


}
);


test("Test login", async () => {
    const response = await request(app).post("/login").send({
        "username": "admin",
        "password": "admin123"
    });

    expect(response.status).toBe(200);

    const response2 = await request(app).post("/login").send({
        "username": "admin",
        "password": "3891"
    });

    expect(response2.status).toBe(401);
});