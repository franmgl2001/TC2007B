
const PriorityChart = async (req, res, db,) => {
    const data = await db.collection('tickets').find().toArray();
    let dataPriority = {}
    // FIll dataPriority

    data.forEach(element => {
        if (element.Prioridad in dataPriority) {
            dataPriority[element.Prioridad] += 1
        } else {
            dataPriority[element.Prioridad] = 1
        }
    });

    res.json(dataPriority);
}


module.exports = {
    PriorityChart
};