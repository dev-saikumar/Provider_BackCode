const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var objectid = mongoose.Types.ObjectId;

const daytimetable = new Schema({
    uid:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        auto:true
    },
    subid: {
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

const resourceslog = new Schema({
    createdate: {
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
    subid: {
        type: String,
        required: true
    },
    resources: [resourceslog],
    tclasses: {
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