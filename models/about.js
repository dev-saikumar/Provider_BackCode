const mongoose = require("mongoose");
var Schema = mongoose.Schema;


let myFunction = function dynamic_coll(coll_name) {
var studentDetail = new Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
        unique: true,
        sparse:true
    },
    fuid: {
        type: String,
        index: {
            unique: true,
            partialFilterExpression: {
                fuid: {
                    $type: "string"
                }
            }
        },
    },
    mobno: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: {
            unique: true,
            partialFilterExpression: {
                fuid: {
                    $type: "string"
                }
            }
        },
    },
    clsname: {
        type: String,
        required: true
    },
    busno: {
        type: String,
        default: "0"
    },
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
    address: {
        type: String,
        required: true
    },
    guardian: {
        type: String,
        required: true
    }
});
    return mongoose.model(coll_name, studentDetail, coll_name);
}
exports.exp = myFunction;