const express = require("express");
const M = require("../models/about");
const route = express.Router();
var Model;
route.get("/", async (req, res) => {
    try {
        Model = M.exp(req.query.clg_id + "users");
        var response = await Model.findOne({
            _id: req.query.uid
        }, {
            attendance: 0,
            results: 0,
        }).lean();
        if (response!=null) {
            if (response.gid == req.query.guid && response.email == req.query.email)
                res.status(200).json(response).end();
            res.status(404).send("wrong credentials or someone registed already").end();
        } else {
            res.status(404).send("not_found").end();
            console.log("here");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error).end();
    }
});

route.get("/register", async (req, res) => {
    Model = M.exp(req.query.clg_id + "users");
    var user
    try {
        user = await Model.findOne({
            _id: req.query.uid
        }, {
            _id: 1,
            gid: 1,
            email: 1
        }).lean();
        if (user == null){ 
            res.status(404).send("user data not found").end();
        }
        else if (user.gid == undefined) {
            var response = await Model.findOneAndUpdate({
                _id: req.query.uid
            }, {
                $set: {
                    gid: req.query.gid,
                    email: req.query.email,
                    photourl: req.query.photourl
                }
            }, {
                fields:{attendance:0,results:0},
                new: true,
                upsert: true,
                useFindAndModify: true
            });
            res.status(200).send(response).end();
        } else {
            res.status(404).send("someone registered").end();
        }
    } catch (error) {
        res.status(400).send("something went wrong" + error).end();
    }
});

// route.get("/create", async (req, res) => {
//     Model = M.exp(req.query.clg_id + "users");
//     try {
//         let user = Model({
//             _id: "u17cs006",
//             busno: "0",
//             photourl: "http://loyaltybook.com/wp-content/uploads/2014/11/user.png",
//             name: "saikumar",
//             address: "Mig 156 aphb colony guntur",
//             mobno: "9989139063",
//             guardian: "father",
//             clsid: "12",
//             rollno: 15,
//             clgname: "biher",
//     });
//      const result= await user.save();
//      res.send(result).status(200).end();
//     } catch (error) {
//         res.send("something went wrong").status(404).end();
//     }
// });

module.exports = route;