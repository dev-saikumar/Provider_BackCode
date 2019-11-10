const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const csv = require("fast-csv");
const mongoose = require('mongoose');
const model = require('../models/about');

var Model;

const upload = multer({
    dest: 'temp/csv/'
});

router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
        res.status(400).send("file not recieved").end();
    } else if (req.file.mimetype.endsWith("csv")) {
        const filerows = [];
        csv.parseFile(req.file.path, {
            headers: true,
            trim: true
        }).on("data", function (data) {
            data['clgname']=req.query.clgname;
            console.log(data);
            filerows.push(data);
        }).on("end", async function () {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                console.log(req.query.clgname)
                Model = model.exp(req.query.clgname+"users");
                console.log("came here");
                await Model.insertMany(filerows,{ordered:false,forceServerObjectId:true,session});
                console.log("came here22222");
                await session.commitTransaction();
                res.send("correct file recieved and records inserted to database").status(200).end();
            } catch (error) {
                await session.abortTransaction();
                console.log(error);
                res.status(404).send("something went wrong records not inserted").end()
            } finally {
                session.endSession();
                fs.unlinkSync(req.file.path);
            }
        })
    } else {
        if (req.file)
            fs.unlinkSync(req.file.path);
        res.status(404).send("wrong file format only csv is accepted");
    }
});

module.exports = router;