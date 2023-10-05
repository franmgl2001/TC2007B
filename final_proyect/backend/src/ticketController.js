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
        console.log(verifiedToken.user);
        let authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = {}
        if (authData.permissions == "Coordinador") {
            parametersFind["usuario"] = verifiedToken.usuario;
            console.log(parametersFind);
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

const getTicket = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("users").findOne({ "users": verifiedToken.users })
        let parametersFind = { "id": Number(request.params.id) }
        if (authData.permissions == "Coordinador") {
            parametersFind["usuario"] = verifiedToken.users;
        }
        let data = await db.collection('tickets').find(parametersFind).project({ _id: 0 }).toArray();
        log(verifiedToken.usuario, "ver objeto", request.params.id)
        response.json(data[0]);
    } catch {
        response.sendStatus(401);
    }
};

module.exports = {
    getTicket,
    createTicket,
    getAllTickets
};