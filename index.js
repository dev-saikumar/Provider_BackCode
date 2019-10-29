const express = require("express");
const mongoose = require("mongoose");
const app= express();
const getexams=require("./routes/exam");
const timetable=require("./routes/timatable");
const gethomeworks=require("./routes/homework");
const teacherinfo=require("./routes/teacherinfo");
const bodyparser= require("body-parser");
const querries=require("./routes/messages");
const auth=require('./routes/signin');


app.use(bodyparser.json());

app.use("/getexams",getexams);
app.use("/clstimetable",timetable);
app.use("/getteachers",teacherinfo);
app.use("/homeworks",gethomeworks);
app.use("/authenticate",auth);
app.use("/queries",querries);
mongoose.connect('mongodb+srv://couboidsclub:audibenz@cluster0-ax1bc.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true},(err,client)=>{
if(!err){
     app.listen("3001",()=>{
        console.log("server listening");
    });
}
});