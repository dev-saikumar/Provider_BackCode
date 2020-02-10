const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactschema = Schema({
    addr: {
        type: String,
        required: true
    },
    phn_no: {
        type: String,
        required: true
    }
});

const subSchema = Schema({
    sid: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    sname: {
        type: String,
        required: true
    }
});

const accessSchema = Schema({
    acname: {
        type: String,
        required: true
    },
    lsit: [String]
});

const notifications = Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const allcollgschema = mongoose.Schema({
    clgname: {
        type: String,
        required: true
    },
    clgid: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2014/03/24/17/14/education-295185_960_720.png"
    },
    contact: contactschema,
    loc: {
        type: [Number],
    },
    subjects: [subSchema],
    access: [accessSchema],
    noti: [notifications]
}
);

module.exports = mongoose.model('collegemodel', allcollgschema, 'collegesmetadata');