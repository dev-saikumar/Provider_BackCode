const express = require("express");
const M= require("../models/about");
const route= express.Router();
var Model;
route.post("/find",async (req,res)=>{
    try {
        if(Model==null)
        Model=M.exp(req.body.clgname+"users");
        var response= await Model.findOne({fuid:req.body.fuid});
        if(response==null)
        res.status(404).send("not found").end();
        res.status(200).send(response).end();
    } catch (error) {
        res.status(404).send(error).end();
    }
});

route.post("/register",async (req,res)=>{
try {
    if(Model==null)
        Model=M.exp(req.body.clgname+"users");
    var user= await Model.findOne({uid:req.body.uid},{uid:1,fuid:1});
    if(user==null)res.status(404).send("user data not found").end();
    console.log(user);
    user=user.toJSON();
        if(user.fuid=="0"){
        var response= await Model.findOneAndUpdate({"uid":req.body.uid},{$set:{fuid: req.body.fuid}},{new:true});
        res.status(200).send(response).end();
        }
        else{
            res.status(404).send("someone registered").end();
        }
} catch (error) {
    res.status(404).send("something went wrong").end();
}
});

module.exports =route;