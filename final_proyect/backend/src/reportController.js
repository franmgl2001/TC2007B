
const PriorityChart = async (req, res, db,) => {
    const data = await db.collection('tickets').find().toArray();
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
    res.json(dataPriority);
}


module.exports = {
    PriorityChart
};