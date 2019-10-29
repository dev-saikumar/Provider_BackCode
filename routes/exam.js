const express = require("express");
const exammodel = require("../models/exams");
const resultmodel = require('../models/results');
const route = express.Router();
var model1;
var Model2;

route.post("/", async (req, res) => {
  try {
    if(model1==null)
    model1 = exammodel.exp(req.body.clgname+"exams");
     var response= await model1.find({},{timetable:0});
      if(response.length==0)
      res.status(404).send("notfound").end();
    res.status(200).send(response);
  } catch (error){
    res.status(404).error;
  }
});

route.post("/timetable",async (req,res)=>{
try {
  if(model1==null)
  model1 = exammodel.exp(req.body.clgname+"exams");
 var response= await model1.findOne({"examname":req.body.examname}).lean();
 if(response==null)
 res.status(404).send("notfound").end();
 res.status(200).send(response);
} catch (error) {
  
}
});

route.post("/result",async (req,res)=>{
  try {
    console.log("came");
    if(Model2==null){
    Model2=resultmodel.exp(req.body.clgname+"results");
    console.log("cameddd");  
  }
    console.log("started");
   var response= await Model2.findOne({"uid":req.body.uid,"results.examname":req.body.examname},{"results.examname.$":1,"results":1}).lean();
   if(response==null)
   res.status(404).send("notfound").end();
   res.status(200).send(response);
  } catch (error) {
    
  }
  });

module.exports = route;