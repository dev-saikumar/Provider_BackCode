const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectid = mongoose.Types.ObjectId;

const daytimetable = new Schema({
    sub: {
        type: String,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String
    }
});

const weektimetable = new Schema({
    day: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6', '7']
    },
    daytimetable: [daytimetable]
});

const clsmembers = new Schema({
    aboutref: {
        type: String,
        // ref: clg_id + 'users'
    },
    name: {
        type: String,
        required: true
    }
});

const attendancelog = new Schema({
    subid:{
        type:String,
        required:true
    },
    tclasses:{
        type: Number,
        required: true,
        default: 0
    }
});

const classes = new Schema({
    clsname: {
        type: String,
        required: true
    },
    attendance: [attendancelog],
    timetable: [weektimetable],
    clsmembers: [clsmembers],
});
let myFunction = function classesschema(clg_name) {
    return mongoose.model(clg_name + 'classes', classes, clg_name + 'classes');
}

exports.exp = myFunction;