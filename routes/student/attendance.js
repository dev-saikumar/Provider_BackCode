const router = require("express").Router();
const M = require("../../models/about");
const M1 = require('../../models/classes');
const mongoose = require('mongoose');
const M2 = require('../../models/collegemetadata');

var model;
var model1;
var model2

router.get("/", async (req, res) => {
    model = M.exp(req.query.clgid + "users");
    model1 = M1.exp(req.query.clgid + "classes");
    model2 = M2.exp(0, req.query.clgid + metadata);
    try {
        var present = await model.findOne({
            _id: req.query.uid
        }, {
            attendance: 1,
            'attendance.absencelog': 0
        }).lean();
        if (about == null)
            res.status(404).send("something went wrong").end();
        else {
            var subarr = [];
            present.attendance.forEach(element => {
                subarr.push(element.subid);
            });
            Promise.all([
                model1.findOne({
                    _id: req.query.clsid
                }, {
                    attendance: 1
                }).lean(),
                model2.findOne({
                    name: 'subjects',
                    'subjects.subid': {
                        $in: subarr
                    }
                }, {
                    'subjects.$': 1
                }).lean()
            ]).then(([total, subjectarr]) => {
                if (total != null && subjectarr != null) {
                    res.status(200).json({
                        'present': present.attendance,
                        'total': total.attendance,
                        'subjects': subjectarr.subjects
                    }).end()
                }
            }).catch((err) => {
                res.send(404).send('something went wrong');
            });
        }
    } catch (error) {
        console.log("error");
        res.status(400).send("total wrong").end();
    }
});

router.get('/absencelog', async (req, res) => {
    model = M.exp(req.query.clgid + 'users');
    try {
        var result = model.findOne({
            _id: req.query.uid,
            'attendance.subid': req.query.subid
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
