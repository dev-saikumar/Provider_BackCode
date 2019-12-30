const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var subject = new Schema({
    sub: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

var examresult = new Schema({
    examid: {
        type: String,
        required: true
    },
    results: [subject]
});

var absentlogschema= new Schema({
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }
    });

var attendanceschema = new Schema({
    subid: {
        type: String,
        required: true
    },
    attended: {
        type: Number,
        default: 0
    },
    absenselog:[absentlogschema]
    });

const accessSchema=new Schema({
    key:{
        type:String,
        required:true
    },
    value:{
        type: String,
        required:true
    }
    });


var studentDetail = new Schema({
    name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true,
    },
    gid:{
        type: String,
        unique: true,
        sparse: true,
    },
    mobno: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    clsid: {
        type: String,
        default: "0"
    },
    busno: {
        type: String,
        default: "0"
    },
    access:[accessSchema],
    clgname: {
        type: String,
        required: true,
    },
    photourl: {
        type: String,
        default: "http://loyaltybook.com/wp-content/uploads/2014/11/user.png"
    },
    rollno: {
        type: Number,
        required: true
    },
    attendance: [attendanceschema],
    results: [examresult],
    address: {
        type: String,
        required: true
    },
    guardian: {
        type: String,
        required: true
    }
});

let myFunction = function dynamic_coll(coll_name) {
    return mongoose.model(coll_name, studentDetail, coll_name);
}

exports.exp = myFunction;