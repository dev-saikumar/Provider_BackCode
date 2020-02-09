const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var timetable = new Schema({
    date: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
});

var examdetailschema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdon:{
        type: Date,
        default: Date.now()
    },
    access: [String],
    table: [timetable],
});

let myfunction = function collect(prefix) {
    return mongoose.model(prefix, examdetailschema, `biherexams`);
}

exports.exp = myfunction;