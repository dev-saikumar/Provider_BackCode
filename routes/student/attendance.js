const router = require("express").Router();
const M = require("../../models/about");
const M1 = require('../../models/classes');
const mongoose = require('mongoose');
const M2 = require('../../models/collegesmetadata');

var model;
var model1;
var model2

router.get("/", async (req, res) => {
    try {
        model = M.exp(req.query.clgid + "users");
        model1 = M1.exp(req.query.clgid + "classes");
        console.log("111111111111111111");
        model2 = M2;
        console.log("2222222222222222222");
        var present = await model.findOne({
            _id: req.query.uid
        }, {
            attendance: 1,
        }).lean();
        console.log("333333333333333333");
        if (present == null)
            res.status(404).send("something went wrong").end();
        else {
            var subarr = [];
            present.attendance.forEach(element => {
                subarr.push(element.sid);
            });
            console.log("44444444444444444444"+subarr);
            Promise.all([
                model1.findOne({
                    _id: req.query.clsid
                }, {
                    'subjects.res': 0
                }).lean(),
                model2.findOne({
                    clgid: req.query.clgid,
                    'subjects.sid': {$in:subarr}
                }).lean()
            ]).then(([total,subjectarr]) => {
                console.log(subjectarr);
                if (total != null && subjectarr != null) {
                    console.log("555555555555555555555555555");
                    res.status(200).json({
                        'present': present.attendance,
                        'total': total.subjects,
                        'subjects': subjectarr.subjects
                    }).end()
                }
                else{
                    console.log("5555555566666666666666666666");
                    console.log(total+subjectarr);
                    res.status(404).send(subjectarr+"kdsjjjjj");
                }
            }).catch((err) => {
                console.log("55555588888888888888888888888"+err);
                res.status(404).send('something went wrong'+err).end();
            });
        }
    } catch (error) {
        console.log("error");
        res.status(400).send("total wrong"+error).end();
    }
});

router.get('/absencelog', async (req, res) => {
    model = M.exp(req.query.clgid + 'users');
    try {
        var result = model.findOne({
            _id: req.query.uid,
            'attendance.sid': req.query.sid
        }, {
            'attendance.absencelog': 1
        }).lean();
        if (result != null)
            res.send(result).status(200).end();
        else
            res.status(404).send('not found').end();
    } catch (error) {
        res.send("something went wrong").status(400).end();
    }
});

module.exports = router;
