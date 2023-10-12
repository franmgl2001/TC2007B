
const PriorityChart = async (request, response, db, jwt) => {
    const token = request.get("Authentication");
    const verifiedToken = await jwt.verify(token, "secretKey");
    const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
    let parametersFind = {}
    if (authData.permissions == "Coordinador") {
        parametersFind["user"] = verifiedToken.user;
    }
    const data = await db.collection('tickets').find(parametersFind).toArray();
    let dataPriority = {}
    // FIll dataPriority

    dataPriority["Baja"] = 0
    dataPriority["Media"] = 0
    dataPriority["Alta"] = 0

    data.forEach(element => {
        if (element.Prioridad in dataPriority) {
            dataPriority[element.Prioridad] += 1
        }
    }
    );
    response.json(dataPriority);
}


module.exports = {
    PriorityChart
};