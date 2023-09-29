// Valid collection function

const validCollection = (collection) => {
    const validCollections = [
        "Servicios",
        "Mobiliario",
        "Personal",
        "Partes del Edificio",
        "Prioridades"
    ];
    return validCollections.includes(collection);
}


const getDropdown = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        // Gwt query string with collection name
        const collection = request.params.collection;
        // Check if collection is valid
        console.log(collection);
        if (!validCollection(collection)) {
            throw new Error("Invalid collection");
        }

        // Get all data from collection
        const data = await db.collection(collection).find().project({}).toArray();
        // Get data from collection
        response.json(data);
    } catch {
        response.sendStatus(401);
    }
}

module.exports = {
    getDropdown
};