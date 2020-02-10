const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const daytimetable = new Schema({
    sid: {
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
    day:{
        type: Number,
        enum:[0,1,2,3,4,5,6]
    },
    data:[daytimetable]
});

const resourceslog = new Schema({
    ts: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
    },
    name: {
        type: String
    }
});

const subjectlog = new Schema({
    sid: {
        type: String,
        required: true
    },
    resources: [resourceslog],
    tc: {
        type: Number,
        required: true,
        default: 1
    }
});

const classes = new Schema({
    clsname: {
        type: String,
        required: true
    },
    subjects: [subjectlog],
    timetable: [weektimetable],
    members: [String],
});
let myFunction = function classesschema(coll_name) {
    return mongoose.model(coll_name, classes, coll_name);
}

exports.exp = myFunction;