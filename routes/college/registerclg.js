const router = require('express').Router();
const clgmodel = require('../../models/collegesmetadata');
const usermodel = require('../../models/about');
const clsmodel = require('../../models/classes');
const mongoose = require('mongoose');

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
        const usermodel1 = usermodel.exp('biher' + 'users');
        const userdata = await usermodel1({
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
        const usermodel1 = usermodel.exp('biher' + 'users');
        const classmodel = clsmodel.exp('biher' + "classes");
        var session = await mongoose.startSession();
        session.startTransaction();
        if (userexist == true) {
            console.log('2');
            const clsresult = await classmodel.updateOne({
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
            const updateddata = await usermodel1.updateOne({
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
        } else
            res.status(404).send("details not found").end();
    } catch (err) {
        await session.abortTransaction();
        res.status(400).send("something went wrong" + err).end();
    } finally {
        session.endSession();
    }
});

module.exports = router;