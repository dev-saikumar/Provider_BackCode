const mongoose= require('mongoose');

let myfunction=function teacherinfo(coll_name) {

const timetable=mongoose.Schema({
sub:{
    type:String,
    
},
clsname:{
    type:String,
    }
});

const teacherinfo=mongoose.Schema({
name:{
    type:String,
    required: true
},
designation:{
    type:String,
    required: true
},
subjects:[String],
mobno:{
    type:String,
    required:true
},
timetable:[timetable]
});

return mongoose.model(coll_name,teacherinfo,coll_name);
}

exports.exp=myfunction;