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

module.exports = {
    get_id
}