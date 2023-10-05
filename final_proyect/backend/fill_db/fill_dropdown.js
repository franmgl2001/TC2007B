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
        "Teléfono",
        "Basura",
        "Limpieza del Aula"
    ],

    "Digital": [
        "Intertet, Servidores y Equipos",
        "Software",
        "Hardware",
        "Cámaras de seguridad",
        "Soporte técnico presencial y remoto"
    ],

    "Infraestructura": [
        "Paredes",
        "Techo",
        "Ventanas",
        "Puertas",
        "Aulas en general"
    ],

    "Recursos Humanos": [
        "Permisos",
        "Asistencias",
        "Salud",
        "Trámites",
        "Honorarios"
    ],

    "Beneficiarios": [
        "Asistencias",
        "Documentación",
        "Apoyo académico",
        "Salud",
        "Seguridad, bulling"
    ],

    "Mobiliario": [
        "Sillas, butacas",
        "Escritorios",
        "Pizarrones",
        "Cafetería",
        "Estantes, archiveros"
    ],

    "Seguridad": [
        "Delincuencia",
        "Robos",
        "Bandalismo",
        "Imagen institucional",
    ],

    "Materiales": [
        "Educativos",
        "Papelería",
        "Limpieza"
    ],

    "Fenómenos Meteorológicos": [
        "Inundaciones",
        "Incendios",
        "Sismos",
        "Huracanes",
        "Tornados",
        "Sismos"
    ],

    "Clasificación": [
        "Servicios",
        "Digital",
        "Infraestructura",
        "Recursos Humanos",
        "Beneficiarios",
        "Mobiliario",
        "Seguridad",
        "Materiales",
        "Fenómenos Meteorológicos",
    ],
    "Prioridad":
        [
            "Alta",
            "Media",
            "Baja"
        ],
    "Status":
        [
            "Pendiente",
            "En proceso",
            "Resuelto"
        ],
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

