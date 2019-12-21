const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const daytimetable = new Schema({
    sub: {
        type: String,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime:{
        type: String,
        required:true
    }
});

const weektimetable = new Schema({
    day: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5', '6','7']
    },
    daytimetable: [daytimetable]
});

const ttschema = new Schema({
    clsname: {
        type: String,
        required: true
    },
    weektimetable: [weektimetable]
});

let Myfuntion = function (collection) {

    return mongoose.model(collection, ttschema, collection);
}

exports.exp = Myfuntion;