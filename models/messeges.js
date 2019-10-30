const mongoose= require('mongoose');
var Schema= mongoose.Schema;


const messages = new Schema({
    senderuid:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const messageschema= new Schema({
    uid:{
        type:String,
        required:true
    },
    open:{
        type: Boolean,
        required: true,
        default:true
    },
    messages:[messages]
});

let myFunction= function messagemodel(coll_name) {

    return mongoose.model(coll_name,messageschema,coll_name);
}

exports.exp=myFunction;