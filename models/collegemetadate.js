const mongoose = require('mongoose');


const subSchema = mongoose.Schema({
    subid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        auto: true
    },
    subname: {
        type: String,
        required: true
    }
},{
    _id: false
});

const subjects = mongoose.Schema({
    name: {
        type: String,
        default: 'subjects'
    },
    subjects: [subSchema]
});

const accesslist = mongoose.Schema({
    accessname: {
        type: String,
        required: true
    },
    list: [String]
});

const accessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    access: [accesslist]
});

let myfunction = function metadata(selector, coll_name) {
    if (selector == 0)
        return mongoose.model('subjects', subjects, coll_name);
    else
        return mongoose.model('access', accessSchema, coll_name);
}

exports.exp = myfunction;