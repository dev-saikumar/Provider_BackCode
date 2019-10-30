const express = require("express");
const M= require("../models/about");
const route= express.Router();
var Model;
route.get("/",async (req,res)=>{
    try {
        Model=M.exp(req.query.clgname+"users");
        var response= await Model.findOne({fuid:req.query.fuid}).lean();
        if(response==null){
        res.status(404).send("not found").end();
        console.log("here");
        }else{
        response=response.toJSON();
        res.status(200).json(response).end();
        }
    } catch (error) {
        console.log("error")
        res.status(400).send(error).end();
    }
});

route.get("/save",async (req,res)=>{
try {
    Model=M.exp(req.query.clgname+"users");
    var response = await Model.create({clsname:"2a",uid:"2391",name:"saikumar reddy",mobno:"9989139063",email:null,busno:"0",photourl:"http://loyaltybook.com/wp-content/uploads/2014/11/user.png",rollno:"1",address:"mig-156 aphb colony guntur"});
    var resu= await response.save();
    res.send(resu).status(200).end();
} catch (error) {
    
}
});

route.get("/register",async (req,res)=>{
try {
        Model=M.exp(req.query.clgname+"users");
    var user= await Model.findOne({uid:req.query.uid},{uid:1,fuid:1});
    if(user==null)res.status(404).send("user data not found").end();
    console.log(user);
    user=user.toJSON();
        if(!(user.hasOwnProperty(fuid))){
        var response= await Model.findOneAndUpdate({"uid":req.query.uid},{$set:{fuid: req.query.fuid,email: req.query.email}},{new:true,useFindAndModify:true});
        res.status(200).send(response).end();
        }
        else{
            res.status(404).send("someone registered").end();
        }
   } catch (error) {
    res.status(400).send("something went wrong"+error).end();
}
});

module.exports =route;