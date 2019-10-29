const express = require("express");
const M= require("../models/homework");
const route= express.Router();

var model;

route.post("/",async (req,res)=>{
    try {
        if(model==null)
        model=M.exp(req.body.clgname+"homework");
        var about= await model.find({clsname: req.body.clsname}).sort({_id:-1}).limit(10).lean();
        if(about==null)
        res.status(404).send("something went wrong").end();
        res.status(200).send(about).end();
    } catch (error) {
        console.log("error");
        res.status(404).send("total wrong").end();
    }
});
module.exports=route;