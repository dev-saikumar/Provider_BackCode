const mongoose= require('mongoose');
var Schema=mongoose.Schema;

const timetable= new Schema({
    sub:{
        type:String,
        required:true
    },
    clsid:{
        type:String,
        required: true
        }
    });
    
    const teacherinfo= new Schema({
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

let myfunction=function info(coll_name) {

return mongoose.model(coll_name,teacherinfo,coll_name);
}

exports.exp=myfunction;