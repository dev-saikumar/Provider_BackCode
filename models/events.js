const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var myschema = {
    type: String,
    required: true
};

const eventModel = Schema({
    _id: {
        type: String,
        unique: true
    },
    clgid: {
        type: String,
        required: true,
        index: true
    },
    createdby: myschema,
    title: myschema,
    description: myschema,
    image: myschema,
    loc: {
        type: String
    },
    host: myschema,
    place: myschema,
    time: myschema,
    fee: myschema,
    email: myschema,
    block: {
        type: Boolean,
        required: true,
        default: false
    },
    mobile: {
        type: String,
        required: true,
    },
}, 
);

module.exports = mongoose.model('events', eventModel, 'events');