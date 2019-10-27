const mongoose= require('mongoose');

let myfunction= function coll(collection) {
const homework=mongoose.Schema({
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
return mongoose.model(collection,homework,collection);
}

exports.exp=myfunction;