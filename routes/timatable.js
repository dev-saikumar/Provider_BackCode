const express = require("express");
const M = require("../models/timetable");
const route = express.Router();
var model;

route.post('/test', (req, res)=>{
    var name = req.body.name;
    console.log(name);
    res.send(name);
})

route.get("/", async (req, res) => {
    try {
        model = M.exp(req.query.clgname + "timetable");
        const response = await model.findOne({
            "clsname": req.query.clsname
        }).select({
            weektimetable: 1
        }).lean();
        if (response == null)
            res.status(404).send("nothing found").end();
        else
            res.status(200).send(response).end();
    } catch (error) {
        res.status(400).send(error).end();
    }
});
module.exports = route;