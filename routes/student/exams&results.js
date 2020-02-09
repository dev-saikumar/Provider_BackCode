const express = require("express");
const exammodel = require("../../models/exams&results");
const usermodel = require('../../models/about');
const router = express.Router();
var model1;

router.get("/", async (req, res) => {
  try {
    const arr = req.query.access;
    model1 = exammodel.exp(req.query.clgid + "exams");
    var response = await model1.find({
      'access.key': {
        $in: arr
      }
    }, {
      timetable: 0
    }).lean();
    if (response.length == 0) {
      res.status(404).send("notfound").end();
    } else
      res.status(200).send(response);
  } catch (error) {
    res.status(400);
  }
});

router.get("/timetable", async (req, res) => {
  try {
    model1 = exammodel.exp(req.query.clgid + "exams");
    var response = await model1.findOne({
      "_id": req.query.id
    }, {
      timetable: 1
    }).lean();
    if (response == null)
      res.status(404).send("notfound").end();
    else
      res.status(200).send(response);
  } catch (error) {
    res.status(400);
  }
});

router.get('/getresults', async (req, res) => {
  const user = usermodel.exp(req.query.clgid + 'users');
  try {
    const result = await user.findOne({
      _id: req.query.uid,
      "results.update": $and[{
        $lt: Date(1, 1, req.query.year + 1)
      }, {
        $gt: Date(31, 12, req.query.year - 1)
      }]
    }, {
      results: 1
    }).lean();
    if(result!=null)
    res.status(200).send(result.results).end();
    else
    res.status(404).send('something went wrong').end();
  } catch (error) {
    Console.log("error/getresults:"+error);
    res.status(400).send('Something went wrong').end();
  }

});


router.post('/createexam', async (req, res) => {
  model1 = exammodel.exp(req.body.clgid + "exams");
  var arr = [];
  console.log(req.body.clgid);
  req.body.access.forEach(element => {
    arr.push({
      'key': element
    });
  });
  console.log(req.body.clgid);
  try {
    // const examdata = model1({
    //   'examname': req.body.examname,
    //   'startdate': req.body.startdate,
    //   'enddate': req.body.enddate,
    //   'access': arr,
    //   'timetable': req.body.timetable
    // });
    res.send("completed" + req.body.clgid).end();
  } catch (error) {

  }
});

// route.get("/result", async (req, res) => {
//   try {
//     console.log("came");
//     Model2 = resultmodel.exp(req.query.clgname + "results");
//     console.log("started");
//     var response = await Model2.findOne({
//       "uid": req.query.uid,
//       "results.examname": req.query.examname
//     }, {
//       "results.examname.$": 1,
//       "results": 1
//     }).lean();
//     if (response == null)
//       res.status(404).send("notfound").end();
//     else
//       res.status(200).send(response);
//   } catch (error) {
//     res.status(400).error;
//   }
// });

module.exports = router;