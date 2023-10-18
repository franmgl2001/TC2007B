const { logger } = require("./logger");
const { get_id } = require("./misc");

//create
const createTicket = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        // Executive can't create tickets
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        if (authData.permissions == "Ejecutivo") {
            response.sendStatus(401);
            return;
        }
        let addValue = request.body
        const count = await db.collection("tickets").countDocuments();

        addValue["id"] = await get_id(db, "tickets");
        addValue["user"] = verifiedToken.user;
        data = await db.collection('tickets').insertOne(addValue);

        logger(verifiedToken.user, "crear ticket", addValue, db)
        response.json(data);
    } catch {
        response.sendStatus(401);
    }
};

const getAllTickets = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = {}
        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }
        if ("search" in request.query) {
            const searchQuery = request.query.search;
            // Add search conditions to parametersFind object based on specific keys
            parametersFind["$or"] = [
                { "Prioridad": { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for key1
                { "Aula": { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for key2
                { "Coordinador": { $regex: searchQuery, $options: "i" } },
                { "Categoría": { $regex: searchQuery, $options: "i" } },
                { "Subcategoría": { $regex: searchQuery, $options: "i" } },
                { "Status": { $regex: searchQuery, $options: "i" } },
                { "Fecha de Incidente": { $regex: searchQuery, $options: "i" } },
                { "Fecha de Resolución": { $regex: searchQuery, $options: "i" } },
                { "NumeroOficio": { $regex: searchQuery, $options: "i" } }
            ];
        }

        if ("_sort" in request.query) {
            let sortBy = request.query._sort;
            let sortOrder = request.query._order == "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {}
            sorter[sortBy] = sortOrder
            let data = await db.collection('tickets').find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            data = data.slice(start, end)
            response.json(data);
        } else {
            let data = []
            data = await db.collection('tickets').find(parametersFind).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)

            response.json(data);
        }
    } catch {
        response.sendStatus(401);
    }
}

const deleteTicket = async (request, response, db, jwt) => {
    try {
        const token = request.get("Authentication");
        const verifiedToken = await jwt.verify(token, "secretKey");
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = { "id": Number(request.params.id) }
        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        } else if (authData.permissions == "Ejecutivo") {
            response.sendStatus(401);
            return;
        }
        let data = await db.collection('tickets').deleteOne(parametersFind);
        logger(verifiedToken.user, "eliminar ticket", request.params.id, db)
        response.json(data);
    } catch {
        response.sendStatus(401);
    }
}

const getTicket = async (request, response, db, jwt) => {
    try {
        const token = request.get("Authentication");
        const verifiedToken = await jwt.verify(token, "secretKey");
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = { "id": Number(request.params.id) }
        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }
        let data = await db.collection('tickets').findOne(parametersFind);
        // Remove _id from object
        delete data["_id"]
        response.json(data);
    } catch {
        response.sendStatus(401);
    }
};

const updateTicket = async (request, response, db, jwt) => {
    try {
        const token = request.get("Authentication");
        const verifiedToken = await jwt.verify(token, "secretKey");
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = {}
        let updateValue = request.body;
        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }
        else if
            (authData.permissions == "Ejecutivo") {
            response.sendStatus(401);
            return;
        }
        parametersFind["id"] = Number(request.params.id)

        await db.collection('tickets').updateOne(parametersFind, { $set: updateValue });

        let data = await db.collection('tickets').findOne(parametersFind);
        // Remove _id from object
        delete data["_id"]

        await logger(verifiedToken.user, "actualizar ticket", request.params.id, db)
        response.json(data);
    }
    catch {
        response.sendStatus(401);
    }

}

module.exports = {
    getTicket,
    createTicket,
    getAllTickets,
    deleteTicket,
    updateTicket
};


