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
        unique:true
    },
    mobno:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    clsname:{
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
        default:"http://loyaltybook.com/wp-content/uploads/2014/11/user.png"
    },
    rollno:{
        type: Number,
        default:"0"
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