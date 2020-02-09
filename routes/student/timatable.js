const router = require("express").Router();
const M = require("../../models/classes");
var model;
router.get("/", async (req, res) => {
    try {
        model = M.exp(req.query.clgid + "classes");
        const response = await model.findOne({
            "_id": req.query.clsid
        }).select({
            timetable: 1
        }).lean();
        if (response == null)
            res.status(404).send("nothing found").end();
        else
            res.status(200).send(response).end();
    } catch (error) {
        res.status(400).send(error).end();
    }
});
module.exports = router;