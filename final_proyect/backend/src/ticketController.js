//create
const createTicket = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue = request.body
        const count = await db.collection(collectionName).countDocuments();
        let id = count + 1;
        addValue["id"] = id;
        addValue["user"] = verifiedToken.usuario;
        data = await db.collection('tickets').insertOne(addValue);
        response.json(data);
    } catch {
        response.sendStatus(401);
    }
};

module.exports = {
    createTicket
};