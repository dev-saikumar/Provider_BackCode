const mongoose= require('mongoose');
var Schema=mongoose.Schema;

const homework=new Schema({
    clsname:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required: true
    },
    lastdate:{
        type:String,
        required:true
    },
    timestamp:{
        type:String,
        required: true
    },
    subject:{
        type:String,
        required:true
    },
    teacher:{
        type:String,
        required:true
    }
    });

let myfunction= function coll(collection) {
return mongoose.model(collection,homework,collection);
}

exports.exp=myfunction;