//create
const createTicket = async (request, response, db, jwt) => {
    console.log(request.body)
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
    createTicket
};