const mongoose = require('mongoose');
const eventmodel = require('../models/events');
const route = require('express').Router();
const mongo = require('mongodb');

//Sending all available events
//pass specific branch code and year
route.get('/', async (req, res) => {
    try {
        const clg_id = req.query.clg_id;
        const branch = req.query.branch;
        const year = req.query.year;
        var data =
            await eventmodel(clg_id + "events").find({
                $or: [{
                    branch: "all"
                }, {
                    branch: branch
                }],
                $or: [{
                    year: "all"
                }, {
                    year: year
                }],
            }
            ).then((data) => {
                console.log(`Events list : ${data}`);
                res.send(data);
            })
    }
    catch{
        console.log("Please check the connection buddy");
        res.send("Smtng went wrong");
    }
});

//Creating Event by passing 8 parameters
route.post('/create', async (req, res) => {
    var tempBranch = "all";
    const clg_id = req.body.clg_id;
    try {
        var data = await eventmodel(clg_id + "events").create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            host: req.body.host,
            time: req.body.time,
            fee: req.body.fee,
            branch: tempBranch, //send branch code or send `all`
            year: req.body.year  //send year code or send `all`
        }).then((doc) => {
            console.log(doc);
            res.send(`Event created successfully : ${data}`)
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
        res.send(data);
    }
    catch (err) {
        console.log("Creation failed at init stage");
        res.send("Thusss..." + err + " is error ");
    }
})

//Deleting a Event
//Pass document _id 
route.get("/delete", async (req, res) => {
    const clg_id = req.query.clg_id;
    try {
        await eventmodel(clg_id + "events").deleteOne({
            "_id": mongo.ObjectId(req.query.id)
        }).then((data) => {
            res.send(`Deleted Successfully : ${data}`);
        }).catch((err) => {
            console.log("Failed to delete document");
            res.send("Document not deleted");
        })
    } catch (err) {
        console.log("Check delete api : " + err);
        res.send("Something went wrong while deleting event");
    }
})

module.exports = route; 