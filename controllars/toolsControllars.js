const { getDb } = require("../utils/dbConnect")

module.exports.getAllTools = async (req, res, next) => {
    try {
        const db = getDb()
        const result = await db.collection('tools').find().toArray()
        res.status(200).json({ success: true, result })

    } catch (error) {
        next()
    }
}

module.exports.saveTools = async (req, res, next) => {
    try {
        const db = getDb()
        const tool = req.body
        const result = await db.collection("tools").insertOne(tool);
        console.log(result)
        if (result.acknowledged) {
            res.send({
                success: true,
                message: `Tools added insited id : ${result.insertedId}`
            })
        }
    } catch (error) {
        next(error)

    }
}

module.exports.getToolsById = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        console.log(id)
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Not a valid tool id." });
        }

        const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });
        console.log(tool, 'tools')

        if (!tool) {
            return res.status(400).json({ success: false, error: "Couldn't find a tool with this id" });
        }

        res.status(200).json({ success: true, data: tool });

    } catch (error) {
        next()
    }
}

module.exports