const express = require("express");
const M=require("../models/messeges");
const route=express.Router();
var Model;
route.post("/get",async (req,res)=>{
try {
    if(Model==null)
    Model= M.exp(req.body.clgname+"messages");
    var response= await Model.find({uid:req.body.uid},{messages: 0}).sort({_id:-1}).limit(15).lean();
    if(response.length==0)
    res.status(404).send("not found").end();
    res.status(200).send(response);
} catch (error) {
    res.status(400).send("something went wrong").end();
}
});

route.post("/addmessage",async (req,res)=>{
try {
    if(Model==null)
    Model=M.exp(req.body.clgname+"messages");
    // Model.messages.push({
    //     message: req.body.msg,
    //     senderuid: req.body.sender
    // });
   //var response= await Model.save();
    console.log("entered");
    var response= await Model.update({uid:req.body.uid},{$push:{messages:{"message":req.body.message,"senderuid":req.body.sender}}});
    if(response==null)
    res.status(404).send("something w wrong").end();
    res.status(200).send(response).end();
} catch (error) {
    res.status(400).send("something went wrong").end();
}
});


module.exports=route;