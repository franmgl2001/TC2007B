const bcrypt = require('bcrypt');
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


async function get_id(db, collection) {

    let res = await db.collection(collection)
        .find()
        .sort({ _id: -1 }) // Sort in descending order based on _id
        .limit(1) // Limit the result to 1 document
        .toArray()

    if (res.length == 0) {
        return 1;
    }
    return res[0].id + 1;
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

    "Categoría": [
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
    "Aula":
        [
            "CDMX Centro",
            "CDMX Occidente",
            "CDMX Sur",
            "CDMX Oriente",
            "Monterrey",
            "Guadalajara",
            "Puebla",
            "Querétaro",
        ]
};



let db = connectDB();
console.log("connected");
const namedData = addNameToData(data);


async function addDataToDB(db, data) {
    for (let key in data) {
        await db.collection(key).insertMany(data[key]);
    }
}

async function addAdminUser(db) {
    const user = "admin";
    let pass = "admin123";
    const fName = "admin";
    const email = "admin@tec.mx";
    const permissions = "Admin";

    // Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);

    let usuarioAgregar = {
        "username": user, "password": pass, "fullName": fName, "email": email, "permissions": permissions
    };
    usuarioAgregar["id"] = await get_id(db, "users");
    data = await db.collection("users").insertOne(usuarioAgregar);

}



async function main() {
    try {
        let db = await connectDB(); // Wait for the database connection
        console.log("Connected to the database");
        const namedData = addNameToData(data);
        await addDataToDB(db, namedData);
        await addAdminUser(db);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error:", error);
    }

    // Stop server
    process.exit();
}

main();