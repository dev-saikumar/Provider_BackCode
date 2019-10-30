const express = require("express");
const M= require("../models/about");
const route= express.Router();
var Model;
route.get("/",async (req,res)=>{
    try {
        if(Model==null)
        Model=M.exp(req.query.clgname+"users");
        var response= await Model.findOne({fuid:req.query.fuid}).lean();
        if(response==null)
        res.status(400).send("not found").end();
        res.status(200).send(response).end();
    } catch (error) {
        res.status(400).send(error).end();
    }
});

route.get("/register",async (req,res)=>{
try {
    if(Model==null)
        Model=M.exp(req.query.clgname+"users");
    var user= await Model.findOne({uid:req.query.uid},{uid:1,fuid:1});
    if(user==null)res.status(404).send("user data not found").end();
    console.log(user);
    user=user.toJSON();
        if(user.fuid=="0"){
        var response= await Model.findOneAndUpdate({"uid":req.query.uid},{$set:{fuid: req.query.fuid}},{new:true,useFindAndModify:true});
        res.status(200).send(response).end();
        }
        else{
            res.status(400).send("someone registered").end();
        }
} catch (error) {
    res.status(400).send("something went wrong").end();
}
});

module.exports =route;