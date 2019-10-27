const mongoose= require("mongoose");

let myFunction=function dynamic_coll(coll_name){
var studentDetail= mongoose.Schema({
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
    type: Number,
    default:"0"
},
photourl:{
    type: String,
    default:"0"
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

return mongoose.model(coll_name,studentDetail,coll_name);
}
exports.exp=myFunction;