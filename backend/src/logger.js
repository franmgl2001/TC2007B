async function logger(subject, action, object, db) {
    toLog = {}
    toLog["timestamp"] = new Date();
    toLog["subject"] = subject;
    toLog["action"] = action;
    toLog["object"] = object;
    await db.collection("log").insertOne(toLog);
}

module.exports = {
    logger
};