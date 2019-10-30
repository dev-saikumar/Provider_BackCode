const express = require("express");
const M= require("../models/homework");
const route= express.Router();

var model;

route.get("/",async (req,res)=>{
    try {
        if(model==null)
        model=M.exp(req.query.clgname+"homework");
        var about= await model.find({clsname: req.query.clsname}).sort({_id:-1}).limit(10).lean();
        if(about==null)
        res.status(404).send("something went wrong").end();
        res.status(200).send(about).end();
    } catch (error) {
        console.log("error");
        res.status(404).send("total wrong").end();
    }
});
module.exports=route;