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
        required:true,
    },
    email:{
        type:String,
        default:"0",
        unique:true
    },
    clsname:{
        type: String,
        required:true
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
        default:"http://loyaltybook.com/wp-content/uploads/2014/11/user.png"
    },
    rollno:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    }
    });    

let myFunction=function dynamic_coll(coll_name){
return mongoose.model(coll_name,studentDetail,coll_name);
}
exports.exp=myFunction;