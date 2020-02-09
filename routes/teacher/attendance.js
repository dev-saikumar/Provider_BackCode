const mongoose = require('mongoose');
const router = require('express').Router();
const M = require("../../models/about");
const M1 = require('../../models/classes');
var aboutmodel;
var clsmodel;

router.post('/updatendance', async (req, res) => {
    try {
        aboutmodel = M.exp(req.query.clgid + 'users');
        clsmodel = M1.exp(req.query.clgid + 'classes');
        var session = await mongoose.startSession();
        session.startTransaction();
        const classupdate = await clsmodel.updateOne({
            _id: req.body.clsid,
            'subjects.sid': req.body.sid
        }, {
            $inc: {
                "subjects.$.tclasses": 1
            }
        }).session(session);
        if (classupdate.n < 1 && classupdate.nModified < 1) {
            const arr = req.body.present.concat(req.body.absent);
            Promise.all([
                model.updateMany({
                    _id: arr,
                }, {
                    $push: {
                        "attendance": {
                            sid: req.body.sid,
                            attended: 1
                        }
                    }
                }).session(session),
                model1.updateOne({
                    _id: req.body.clsid
                }, {
                    $push: {
                        subjects: {
                            tclasses: 1,
                            sid: req.body.sid
                        }
                    }
                }).session(session)
            ]).then(async ([]) => {

            }).catch(async (err) => {
                await session.abortTransaction();
                res.status(404).send('something went wrong').end();
            });
        }
            Promise.all([aboutmodel.updateMany({
                    _id: {
                        $in: req.body.present
                    },
                    "attendance.sid": req.body.sid
                }, {
                    $inc: {
                        "attendance.$.attended": 1
                    }
                }).session(session),
                aboutmodel.updateMany({
                    _id: req.body.absent,
                    "attendance.sid": req.body.sid
                }, {
                    $push: {
                        "attendance.$.absencelog": {
                            date: req.body.date,
                            time: req.body.time
                        }
                    }
                })
            ]).then(([]) => {

            }).catch(async (err) => {
                await session.abortTransaction();
                res.status(404).send('something went wrong').end();
            });
    } catch (error) {
        await session.abortTransaction();
        res.send("something went wrong try again").status(400).end();
    } finally {
        session.endSession();
    }
});

router.get('/getclsmembers', async (req, res) => {
    try {
        aboutmodel=M.exp('biher'+'users');
        clsmodel=M1.exp('biher'+'classes');
        const listuid=await clsmodel.findOne({_id:req.query.clsid},{members:1}).lean();
        if(listuid!=null){
            const memlist= await aboutmodel.find({_id:{$in:listuid.members}},{name:1,_id:1}).lean();
            res.status(200).json(memlist).end();
        }
        else{
            res.status(404).send("class not found").end();
        }
    } catch (error) {
        res.status(400).send('something went wrong').end();
    }
});