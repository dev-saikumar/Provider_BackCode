const mongoose= require('mongoose');

let myFunction= function messagemodel(coll_name) {

    const messages = mongoose.Schema({
        senderuid:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    })

    const messageschema= mongoose.Schema({
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
    return mongoose.model(coll_name,messageschema,coll_name);
}

exports.exp=myFunction;