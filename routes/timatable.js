const express = require("express");
const M= require("../models/timetable");
const route= express.Router();
var model;
route.post("/",async (req,res)=>{
    try {
        if(model==null)
        model= M.exp(req.body.clgname+"timetable");
        const response= await model.findOne({"clsname":req.body.clsname}).select({weektimetable:1}).lean();
        if(response==null)
        res.status(404).send("nothing found").end();
        res.status(200).send(response).end();
    } catch (error) {

        
        res.status(400).send(error).end();
    }
});
module.exports =route;