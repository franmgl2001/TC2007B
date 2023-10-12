const { logger } = require("./logger");

//create
const createTicket = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue = request.body
        const count = await db.collection("tickets").countDocuments();
        let id = count + 1;
        addValue["id"] = id;
        addValue["user"] = verifiedToken.user;
        data = await db.collection('tickets').insertOne(addValue);
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
            parametersFind["usuario"] = verifiedToken.user;
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
        } else if ("id" in request.query) {
            let data = []
            for (let index = 0; index < request.query.id.length; index++) {
                let dataObtain = await db.collection('tickets').find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                data = await data.concat(dataObtain)
            }
            response.json(data);
        } else {
            let data = []
            data = await db.collection('tickets').find(request.query).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            response.json(data)
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
        }
        let data = await db.collection('tickets').deleteOne(parametersFind);
        logger(verifiedToken.user, "eliminar objeto", request.params.id)
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
        logger(verifiedToken.user, "ver ticket", request.params.id, db)
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

        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }
        parametersFind["id"] = Number(request.params.id)
        const updateValue = request.body;
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