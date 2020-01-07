const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var myschema = {
    type: String,
    required: true
}
const eventModel = Schema({
    _id: {
        type: Number,
        unique: true
    },
    clgid: myschema,
    createdby: myschema,
    title: myschema, description: myschema, image: myschema, host: myschema, place: myschema, time: myschema, fee: myschema, email: myschema,
    loc: {
        type: [Number],
        index: '2d'
    },
    visibility: { type: Boolean },
    block: {
        type: Boolean,
    },
    access: {
        type: [String]
    },
    mobile: {
        type: [String],
        required: true,
    },
});

module.exports = function (clg) {
    return mongoose.model('events', eventModel, `${clg}events`);
} 