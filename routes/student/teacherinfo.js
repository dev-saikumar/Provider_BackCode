const router = require("express").Router();
const M= require('../../models/teacherinfo');
var model;

router.get("/",async (req,res)=>{
    try{
        model=M.exp(req.query.clgname+"teacherinfo");
        console.log("11");
        var response= await model.find({},{timetable:0}).limit(15).lean();
        console.log("22");
        if(response.length==0)
        res.send("nothing found").status(404).end();
        else
        res.send(response).status(200).end();
    } catch (error) {
        res.status(400).send(error).end();
    }
});

module.exports =router;