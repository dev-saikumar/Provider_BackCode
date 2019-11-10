const express = require("express");
const mongoose = require("mongoose");
const app = express();
const getexams = require("./routes/exam");
const timetable = require("./routes/timatable");
const gethomeworks = require("./routes/homework");
const teacherinfo = require("./routes/teacherinfo");
const bodyparser = require("body-parser");
const querries = require("./routes/messages");
const auth = require('./routes/signin');
const check = require('./models/checkCollege');
const uploader = require('./routes/uploader');
const lab=require('./routes/labs');


app.use(bodyparser.json());
// app.use((req, res, next) => {
//     if (!check.checkClg(req.query.clgname)) {
//         res.status(401).send("what are you try to do baby").end();
//     } else
//         next()
// });
app.use("/upload", uploader);
app.use("/getexams", getexams);
app.use("/clstimetable", timetable);
app.use("/getteachers", teacherinfo);
app.use("/homeworks", gethomeworks);
app.use("/authenticate", auth);
app.use("/queries", querries);
app.use("/labs",lab);

mongoose.connect('mongodb+srv://couboidsclub:audibenz@cluster0-ax1bc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, client) => {
    if (!err) {
        app.listen("3001", () => {
            console.log("server listening");
        });
    }
});