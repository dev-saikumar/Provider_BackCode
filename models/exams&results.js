const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var timetable = new Schema({
    date: {
        type: Date,
        required: true
    },
    subname: {
        type: String,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
});



var examdetailschema = new Schema({
    examname: {
        type: String,
        required: true
    },
    createdat:{
        type: Date,
        default: Date.now()
    },
    startdate:{
        type: Date,
        required:true
    },
    enddate:{
        type: Date,
        required:true
    },
    access: [String],
    timetable: [timetable],
});

let myfunction = function collect(prefix) {
    return mongoose.model(prefix, examdetailschema, prefix);
}

exports.exp = myfunction;