const mongoose= require("mongoose");
var Schema=mongoose.Schema;

var studentDetail=new Schema({
    name:{
        type: String,
        required:true
    },
    uid:{
        type:String,
        required:true,
        unique:true
    },
    fuid:{
        type: String,
        default:"0",
        unique:true
    },
    mobno:{
        type: Number,
        default:"0"
    },
    email:{
        type:String,
        default:"0"
    },
    cls:{
        type: String,
        default:"0"
    },
    busno:{
        type: String,
        default:"0"
    },
    clgname:{
        type:String,
        required:true
    },
    photourl:{
        type: String,
        default:""
    },
    rollno:{
        type: Number,
        default:"0"
    },
    address:{
        type: String,
        default:"0"
    }
    });    

let myFunction=function dynamic_coll(coll_name){
return mongoose.model(coll_name,studentDetail,coll_name);
}
exports.exp=myFunction;