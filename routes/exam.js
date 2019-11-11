const express = require("express");
const exammodel = require("../models/exams");
const resultmodel = require('../models/results');
const check = require("../models/checkCollege");
const route = express.Router();
var model1;
var Model2;

route.get("/", async (req, res) => {
  try {
    model1 = exammodel.exp(req.query.clgname + "exams");
    var response = await model1.find({}, {
      timetable: 0
    });
    if (response.length == 0) {
      res.status(404).send("notfound").end();
    } else
      res.status(200).send(response);
  } catch (error) {
    res.status(400).error;
  }
});

route.get("/timetable", async (req, res) => {
  try {
    model1 = exammodel.exp(req.query.clgname + "exams");
    var response = await model1.findOne({
      "examname": req.query.examname
    }).lean();
    if (response == null)
      res.status(404).send("notfound").end();
    else
      res.status(200).send(response);
  } catch (error) {
    res.status(400).error;
  }
});

route.get("/result", async (req, res) => {
  try {
    console.log("came");
    Model2 = resultmodel.exp(req.query.clgname + "results");
    console.log("started");
    var response = await Model2.findOne({
      "uid": req.query.uid,
      "results.examname": req.query.examname
    }, {
      "results.examname.$": 1,
      "results": 1
    }).lean();
    if (response == null)
      res.status(404).send("notfound").end();
    else
      res.status(200).send(response);
  } catch (error) {
    res.status(400).error;
  }
});

module.exports = route;