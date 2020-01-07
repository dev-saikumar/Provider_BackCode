const router = require('express').Router();
const clgmodel = require('../../models/collegedata');
const usermodel = require('../../models/about');
const clsmodel = require('../../models/classes');
const clgdatamodel = require('../../models/collegemetadata');
const mongoose = require('mongoose');

var cls, user, clgdata;

router.get('/registerclg', async (req, res) => {
    try {
        const clgdata = await clgmodel({
            clgname: req.query.clgname,
            logo: 'https://cdn.pixabay.com/photo/2014/03/24/17/14/education-295185_960_720.png',
            address: req.query.adr
        }).save();
        res.send(clgdata).status(200).end();
    } catch (error) {
        res.status(400).send('something went wrong').end();
    }
});

router.get('/createuser', async (req, res) => {
    try {
        user = usermodel.exp('biher' + 'users');
        const userdata = await user({
            name: 'saikumar reddy',
            _id: req.query.uid,
            mobno: '9989139063',
            gid: null,
            access: ['year-2', 'branch-cse'],
            clgid: '5e0f61e2d12ea765e3263098',
            address: 'mig-156,ameerpet,hyderabad',
            guardian: 'sambireddy',
        }).save();
        res.status(200).send(userdata).end();
    } catch (error) {
        res.status(400).send("something went wrong" + error).end();
    }
});

router.get('/addtoclass', async (req, res) => {
    try {
        user = usermodel.exp('biher' + 'users');
        cls = clsmodel.exp('biher' + "classes");
        var session = await mongoose.startSession();
        session.startTransaction();
        const clsresult = await cls.updateOne({
            clsname: req.query.clsname
        }, {
            $addToSet: {
                members: [req.query.uid]
            }
        }, {
            upsert: true,
            setDefaultsOnInsert: true,
            new: true,
            session: session
        }).lean();
        console.log("3" + clsresult);
        const updateddata = await user.updateOne({
            _id: req.query.uid
        }, {
            $set: {
                clsid: clsresult._id
            }
        }, {
            session: session
        }).lean();
        await session.commitTransaction();
        res.status(200).json(updateddata).end();
    } catch (err) {
        await session.abortTransaction();
        res.status(400).send("something went wrong" + err).end();
    } finally {
        session.endSession();
    }
});

router.post('/addsubjects', async (req, res) => {
    try {
        clgdata = clgdatamodel.exp(0, 'biher' + 'metadata');
        var arr = [];
        console.log(req.body.subjects);
        req.body.subjects.forEach(element => {
            arr.push({ "subname": element });
        });
        // const result = await clgdata.updateOne({"name":"subjects"},{$addToSet:{subjects:arr}},{upsert:true}).lean();
        const response = await clgdata.findOne({ name: "subjects", "subjects.subid": "5e130130475aee1bada954d9" }, { "subjects.$": 1 }).lean();
        res.status(200).json(response).end();
    } catch (error) {
        res.status(400).json("something went wrong" + error).end();
    }
});

module.exports = router;