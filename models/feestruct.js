const mongoose= require('mongoose');
var Schema=mongoose.Schema;

const feeschema = Schema({
    feename: {
        type: String,
        required: true
    },
    /*timestamp*/
    ts: {
        type: Date,
        default: Date.now()
    },
    /*lastdate*/
    ld: {
        type: String,
        required: true
    },
    tfee: {
        type: Number,
        required: true
    },
    fine: {
        type: Number
    }
});

let exportfunction= function func(coll_name) {
    return mongoose.model(coll_name,feeschema,coll_name);
}

exports.exp=exportfunction;
