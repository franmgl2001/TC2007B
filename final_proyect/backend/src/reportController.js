const validCollection = (collection) => {
    const validCollections = [
        "Categoría",
        "Prioridad",
        "Status",
    ];
    return validCollections.includes(collection);
}
// Priority Chart
const priorityChart = async (request, response, db, jwt) => {
    try {
        const collection = request.params.collection;
        if (!validCollection(collection)) {
            response.sendStatus(401);
        }
        const token = request.get("Authentication");
        const verifiedToken = await jwt.verify(token, "secretKey");
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = {}

        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }
        const data = await db.collection('tickets').find(parametersFind).toArray();
        const collectionData = await db.collection(collection).find().toArray();
        let dataPriority = {}

        collectionData.forEach(element => {
            dataPriority[element["name"]] = 0
        });


        data.forEach(element => {
            if (element[collection] in dataPriority) {
                dataPriority[element[collection]] += 1
            }
        }
        );
        response.json(dataPriority);
    } catch {
        response.sendStatus(401);
    }
}

// Classroom Chart
const classroomChart = async (request, response, db, jwt) => {
    try {
        const collection = request.params.collection;
        if (!validCollection(collection)) {
            response.sendStatus(401);
        }
        const token = request.get("Authentication");
        const verifiedToken = await jwt.verify(token, "secretKey");
        const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
        let parametersFind = {}
        if (authData.permissions == "Coordinador") {
            parametersFind["user"] = verifiedToken.user;
        }

        // FIll dataClassroom
        const data = await db.collection('tickets').find(parametersFind).toArray();
        const collectionData = await db.collection(collection).find().toArray();
        let dataClassroom = {}
        dataClassroom = orderClassroomData(data, collection, collectionData)
        response.json(dataClassroom);
    } catch {
        response.sendStatus(401);
    }

}

const orderClassroomData = (data, collection, collectionData) => {
    let dataClassroom = {}
    let labels = []
    let datasets = {}
    data.forEach(ticket => {
        // Check if ticket[Aula] is in labels
        if (!labels.includes(ticket.Aula)) {
            labels.push(ticket.Aula)
        }
    });
    // Fill datasets
    collectionData.forEach(element => {

        datasets[element["name"]] = []
        labels.forEach(label => {
            datasets[element["name"]].push(0)
        });
    });

    data.forEach(ticket => {
        datasets[ticket[collection]][labels.indexOf(ticket.Aula)] += 1
    });

    dataClassroom["labels"] = labels
    dataClassroom["datasets"] = datasets

    return dataClassroom
}

function sortByFechaIncidente(data, label) {
    // Use the Array.prototype.sort() method to sort based on "Fecha de Incidente"
    data.sort((a, b) => new Date(a[label]) - new Date(b[label]));
}


function removeInvalidJSONObjects(jsonList) {
    cleanned_json = []
    jsonList.forEach(element => {
        if (element["Fecha de Resolución"] != null) {
            cleanned_json.push(element)
        }
    });
    return cleanned_json
}

const orderLineChartData = (data, label) => {
    if (label === "Fecha de Resolución") {
        data = removeInvalidJSONObjects(data);
    }
    x_labels = []
    y_data = []

    sortByFechaIncidente(data, label)

    data.forEach(element => {
        if (!x_labels.includes(element[label]) && element[label] != null) {
            x_labels.push(element[label])
            if (y_data.length === 0) {
                y_data.push(1)
            }
            else {
                y_data.push(1 + y_data[y_data.length - 1])
            }
        }
        else {
            y_data[x_labels.indexOf(element[label])] += 1
        }
    });

    if (label === "Fecha de Resolución") {
        return { label_res: x_labels, data_res: y_data }
    } else {
        return { label_inc: x_labels, data_inc: y_data }

    }
}


// Provided JSON data
function mergeData(jsonData) {

    // Create a dictionary to store data points for each date label
    const mergedData = {};

    // Merge data from label_inc
    for (let i = 0; i < jsonData.label_inc.length; i++) {
        const label = jsonData.label_inc[i];
        mergedData[label] = {
            data_inc: jsonData.data_inc[i],
            data_res: 0 // Initialize data_res with 0
        };
    }

    // Merge data from label_res
    for (let i = 0; i < jsonData.label_res.length; i++) {
        const label = jsonData.label_res[i];
        if (mergedData[label]) {
            mergedData[label].data_res = jsonData.data_res[i];
        } else {
            mergedData[label] = {
                data_inc: 0, // Initialize data_inc with 0
                data_res: jsonData.data_res[i]
            };
        }
    }

    // Extract merged data back into arrays with dates sorted
    const finalLabels = Object.keys(mergedData).sort();
    const finalDataInc = finalLabels.map(label => mergedData[label].data_inc);
    const finalDataRes = finalLabels.map(label => mergedData[label].data_res);

    // Fill fill ceros with previous data except for the first one
    for (let i = 1; i < finalDataRes.length; i++) {
        if (finalDataRes[i] === 0) {
            finalDataRes[i] = finalDataRes[i - 1]
        }

        if (finalDataInc[i] === 0) {
            finalDataInc[i] = finalDataInc[i - 1]
        }
    }

    // Return merged data
    finalData = {
        labels: finalLabels,
        dataInc: finalDataInc,
        dataRes: finalDataRes
    };

    return finalData;

}


const incidentsChart = async (request, response, db, jwt) => {
    const token = request.get("Authentication");
    const verifiedToken = await jwt.verify(token, "secretKey");
    const authData = await db.collection("users").findOne({ "username": verifiedToken.user })
    let parametersFind = {}
    if (authData.permissions == "Coordinador") {
        parametersFind["user"] = verifiedToken.user;
    }

    // FIll dataClassroom
    const data = await db.collection('tickets').find(parametersFind).toArray();
    let dataLineChart = {}
    dataLineChart = orderLineChartData(data, "Fecha de Incidente")
    dataLineChart2 = orderLineChartData(data, "Fecha de Resolución")
    dataLineChart["label_res"] = dataLineChart2["label_res"]
    dataLineChart["data_res"] = dataLineChart2["data_res"]

    finalData = mergeData(dataLineChart)


    response.json(finalData);

}


module.exports = {
    priorityChart,
    classroomChart,
    incidentsChart
};