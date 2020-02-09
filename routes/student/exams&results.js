const express = require("express");
const exammodel = require("../../models/exams&results");
const check = require("../../models/checkCollege");
const router = express.Router();
var model1;

//Exam timetable 
router.get("/", async (req, res) => {
  try {
    // const arr = req.query.access;
    const arr = ["cse-d","cse-f"];
    model1 = exammodel.exp("exams");
    var response = await model1.findOne({
      "access" : {
        $in : arr
      }
    }).lean();
    console.log("exams here...");
    if (response.length == 0) {
      res.status(404).send("notfound").end();
    } else
      res.status(200).send(response);
  } catch (error) {
    res.status(400);
  }
});

// router.get("/timetable", async (req, res) => {
//   try {
//     model1 = exammodel.exp("exams");
//     var response = await model1.findOne({
//       "_id": req.query.id
//     }, {
//       timetable: 1
//     }).lean();
//     if (response == null)
//       res.status(404).send("notfound").end();
//     else
//       res.status(200).send(response);
//   } catch (error) {
//     res.status(400);
//   }
// });

//Exam create
// router.post('/create', async (req, res) => {
//   model1 = exammodel.exp(req.body.clgid + "metadata");
//   var arr = [];
//   console.log(req.body.clgid);
//   req.body.access.forEach(element => {
//     arr.push({
//       'key': element
//     });
//   });
//   console.log(req.body.clgid);
//   try {
//     const examdata = model1({
//       'examname': req.body.examname,
//       'startdate': req.body.startdate,
//       'enddate': req.body.enddate,
//       'access': arr,
//       'timetable': req.body.timetable
//     });
//     res.send("completed"+req.body.clgid).end();
//   } catch (error) {
//   }
// });

//create  a timetable
router.get('/create', async (req, res) => {
  const clg_id = req.query.clgid;
  const _id = req.query.id;
  try {
    exammodel.exp(req.query.clgid + "metadata").create({

    })
  }
  catch{

  }
}
)


router.get("/result", async (req, res) => {
  try {
    console.log("came");
    Model2 = resultmodel.exp(req.query.clgname + "users");
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

module.exports = router;