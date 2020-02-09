const express = require("express");
const mongoose = require("mongoose");
const app = express();
const getexams = require("./routes/student/exams&results");
const timetable = require("./routes/student/timatable");
const attendance = require("./routes/student/attendance");
const teacherinfo = require("./routes/student/teacherinfo");
const bodyparser = require("body-parser");
const fee = require('./routes/student/fee');
// const querries=require("./routes/messages");
const auth = require('./routes/student/auth');
const check = require('./models/checkCollege');
const college = require('./routes/college/registerclg');
const collegeData = require('./routes/college/clgmetadata');
const events = require("./routes/student/events");
app.use(bodyparser.json());
// app.use((req,res,next)=>{
// if(!check.checkClg(req.query.clgname)){
//     res.status(401).send("what are you try to do baby").end();
// }else
// next()
// });
app.get("/", (req, res)=>{
    res.end("Welcome to the app");
})
app.use("/exams", getexams);
app.use("/timetable", timetable);
app.use("/getteachers", teacherinfo);
app.use("/attendance", attendance);
app.use("/authenticate", auth);
app.use("/fee", fee);
app.use("/events", events);
app.use('/college', college);
app.use('/collegedata', collegeData);
// app.use("/queries",querries);
mongoose.connect('mongodb+srv://couboidsclub:audibenz@cluster0-ax1bc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (!err) {
        app.listen("4000", () => {
            console.log("server listening");
        });
    } else {
        console.log("database error" + err);
    }
});