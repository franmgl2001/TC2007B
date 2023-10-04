const MongoClient = require('mongodb').MongoClient;

async function connectDB() {
    let client = new MongoClient("mongodb://localhost:27017/PorMexicoDev")
    await client.connect();
    db = client.db();
    return db;
}

function addNameToData(data) {
    let newData = {};
    for (let key in data) {
        newData[key] = data[key].map((value) => {
            return { "name": value }
        })
    }
    return newData;
}



data = {
    "Servicios": [
        "Agua",
        "Luz",
        "Internet",
        "Gas",
        "Gestión de residuos (Basura)",
        "Teléfono",
        "Salud",
        "Transporte",
        "Mantenimiento básico",
        "Educativos",
        "Seguridad",
        "Alimentos",
        "Otro"
    ],

    "Mobiliario": [
        "Armarios",
        "Estanterías",
        "Pizarras",
        "Escritorios",
        "Bancos",
        "Taburetes",
        "Sofás",
        "Estantes",
        "Camas",
        "Otro",
    ],
    "Personal": [
        "Coordinador de aula",
        "Docente",
        "Técnico/a de mantenimiento",
        "Seguridad",
        "Otro (especificar)",
        "Beneficiario:",
        "Estudiantes",
        "Visitantes(familia, gobierno, empresa o familia)",
        "Familias",
        "Otro"],
    "Partes del Edificio": [
        "Aulas",
        "Oficinas",
        "Laboratorios",
        "Salas de reuniones",
        "Consultorios médicos",
        "Bibliotecas",
        "Gimnasios",
        "Áreas de recreación",
        "Ludoteca",
        "Salas de espera",
        "Otro "],
    "Prioridad": ["Alta", "Media", "Baja"]
};


let db = connectDB();
console.log("connected");
const namedData = addNameToData(data);


async function addDataToDB(db, data) {
    for (let key in data) {
        await db.collection(key).insertMany(data[key]);
    }
}

async function main() {
    try {
        let db = await connectDB(); // Wait for the database connection
        console.log("Connected to the database");
        const namedData = addNameToData(data);
        await addDataToDB(db, namedData);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error:", error);
    }
}

main();

