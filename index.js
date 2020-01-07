const express = require("express");
const mongoose = require("mongoose");
const app = express();
const getexams = require("./routes/exams&results");
const timetable = require("./routes/timatable");
const gethomeworks = require("./routes/attendance");
const teacherinfo = require("./routes/teacherinfo");
const bodyparser = require("body-parser");
const fee = require('./routes/fee');
// const querries=require("./routes/messages");
const auth = require('./routes/auth');
const check = require('./models/checkCollege');
const utube = require('./routes/youtube2mp4');
const admin = require('./routes/college/registerclg');
const clgdata = require('./routes/clgmetadata');
app.use(bodyparser.json());
// app.use((req,res,next)=>{
// if(!check.checkClg(req.query.clgname)){
//     res.status(401).send("what are you try to do baby").end();
// }else
// next()
// });
app.use("/exams", getexams);
app.use("/timetable", timetable);
app.use("/getteachers", teacherinfo);
app.use("/attendance", gethomeworks);
app.use("/authenticate", auth);
app.use("/fee", fee);
app.use('/admin', admin);
app.use("/getclgdata", clgdata);
// app.use("/queries",querries);
mongoose.connect('mongodb+srv://couboidsclub:audibenz@cluster0-ax1bc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}, (err, client) => {
    if (!err) {
        app.listen("3001", () => {
            console.log("server listening");
        });
    } else {
        console.log("database error" + err);
    }
});