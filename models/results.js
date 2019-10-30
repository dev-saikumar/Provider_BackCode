const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var subject = new Schema({
    sub: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

var resultschema = new Schema({
    examname: {
        type: String,
        required: true
    },
    clsname: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    result: [subject]
});

var studentresult = new Schema({
    uid: {
        type: String,
        required: true
    },
    results: [resultschema]
});

let myfunction = function resultmodel(coll_name) {
    return mongoose.model(coll_name, studentresult, coll_name);
}

exports.exp = myfunction;