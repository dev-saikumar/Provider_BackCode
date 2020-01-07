// const express = require("express");
// const M = require("../models/messeges");
// const route = express.Router();
// var Model;
// route.get("/", async (req, res) => {
//     try {
//         Model = M.exp(req.query.clgname + "messages");
//         var response = await Model.find({
//             uid: req.query.uid
//         }, {
//             messages: 0
//         }).sort({
//             _id: -1
//         }).limit(10).lean();
//         if (response.length == 0)
//             res.status(404).send("not found").end();
//         else
//             res.status(200).send(response);
//     } catch (error) {
//         res.status(400).send("something went wrong").end();
//     }
// });

// route.get("/getmessages", async (req, res) => {
//     try {
//         Model = M.exp(req.query.clgname + "messages");
//         var response = await Model.findOne({
//             uid: req.query.uid
//         }, {
//             messages: 1,
//             messages: {
//                 $slice: -3
//             }
//         }).lean();
//         if (response.length == 0)
//             res.status(404).send("not found").end();
//         else
//             res.status(200).send(response);
//     } catch (error) {
//         res.status(400).send("something went wrong").end();
//     }
// });


// route.get("/addmessage", async (req, res) => {
//     try {
//         Model = M.exp(req.query.clgname + "messages");
//         // Model.messages.push({
//         //     message: req.body.msg,
//         //     senderuid: req.body.sender
//         // });
//         //var response= await Model.save();
//         console.log("entered");
//         var response = await Model.update({
//             uid: req.query.uid
//         }, {
//             $push: {
//                 messages: {
//                     "message": req.query.message,
//                     "senderuid": req.query.sender
//                 }
//             }
//         });
//         if (response == null)
//             res.status(404).send("something w wrong").end();
//         else
//             res.status(200).send(response).end();
//     } catch (error) {
//         res.status(400).send("something went wrong").end();
//     }
// });


// module.exports = route;