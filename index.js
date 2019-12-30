const express = require("express");
const mongoose = require("mongoose");
const app = express();
const getexams = require("./routes/exams&results");
const timetable = require("./routes/timatable");
const gethomeworks = require("./routes/attendance");
const teacherinfo = require("./routes/teacherinfo");
const bodyparser = require("body-parser");
// const querries=require("./routes/messages");
const auth = require('./routes/auth');
const check = require('./models/checkCollege');
const events = require('./routes/events');
const utube = require('./routes/youtube2mp4');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json({ type: 'application/*+json' }));
// app.use((req,res,next)=>{
// if(!check.checkClg(req.query.clgname)){
//     res.status(401).send("what are you try to do baby").end();
// }else
// next()
// });
app.get('/', (req, res) => {
    res.send(
        "Connection Established"
    )
});

app.use("/exams", getexams);
app.use("/clstimetable", timetable);
app.use("/getteachers", teacherinfo);
app.use("/attendance", gethomeworks);
app.use("/authenticate", auth);
app.use("/events", events);
// app.use("/queries",querries);
mongoose.connect('mongodb+srv://couboidsclub:audibenz@cluster0-ax1bc.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (!err) {
        app.listen("3001", () => {
            console.log("server listening");
        });
    }
    else {
        console.log("database error" + err);
    }
});