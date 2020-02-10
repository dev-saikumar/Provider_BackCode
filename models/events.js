const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var myschema = {
    type: String,
    required: true
};

const eventModel = Schema({
    _id: {
        type: String,
    },
    ts:{
        type: Date,
        default: Date.now()
    },
    clgid: {
        type: String,
        required: true,
        index: true
    },
    createdby: myschema,
    title: myschema,
    description: myschema,
    image: {
        type: String,
        default: "https://hire4event.com/blogs/wp-content/uploads/2019/03/best-Event-company-in-Greater-Noida--768x448.jpg"
    },
    loc: {
        type: String
    },
    host: myschema,
    place: myschema,
    time: {
        type: Date,
        required: true
    },
    fee: myschema,
    email: myschema,
    block: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: String,
        required: true,
    },
}, 
);

module.exports = mongoose.model('events', eventModel, 'events');