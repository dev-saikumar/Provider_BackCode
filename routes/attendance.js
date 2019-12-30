const express = require("express");
const M = require("../models/about");
const M1 = require('../models/classes');
const mongoose = require('mongoose');
const route = express.Router();

var model;
var model1;

route.get("/", async (req, res) => {
    console.log(`${req.query.clg_id}, ${req.query.uid}, ${req.query.clsid}`);
    // res.send(`${req.query.clg_id}, ${req.query.uid}, ${req.query.clsid}`);
    model = M.exp(req.query.clg_id + "users");
    model1 = M1.exp(req.query.clg_id + "classes");
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
            try {
                const total = await model1.findOne({
                    _id: req.query.clsid
                }, {
                    attendance: 1
                }).lean();
                const result = { 'present': present.attendance, 'total': total.attendance }
                res.status(200).send(result).end();
            } catch (error) {
                res.status(400).send("something went wrong").end();
            }
        }
    } catch (error) {
        console.log("error");
        res.status(400).send("total wrong").end();
    }
});

route.get('/absencelog', async (req, res) => {
    model = M.exp(req.query.clg_id + 'users');
    try {
        var result = model.findOne({
            _id: req.query.uid,
            'attendance.subid': req.query.subid
        }, {
            'attendance.absencelog': 1
        }).lean();
        res.send(result).status(200).end();
    } catch (error) {
        res.send("something went wrong").status(400).end();
    }
});

route.post('/updatendance', async (req, res) => {
    model = M.exp(req.query.clg_id + 'users');
    try {
        var session = await mongoose.startSession();
        session.startTransaction();
        model.updateMany({ _id: [] })
    } catch (error) {
        await session.abortTransaction();
        res.send("something went wrong try again").status(400).end();
    }
});

module.exports = route;