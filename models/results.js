const mongoose= require('mongoose');

let myfunction=function resultmodel(coll_name) {

   var subject=mongoose.Schema({
        sub:{
            type:String,
            required: true
        },
        total:{
            type: Number,
            required:true
        },
        marks:{
            type: Number,
            required:true
        }
    });

var resultschema=mongoose.Schema({
examname:{
    type:String,
    required:true
},
clsname:{
    type:String,
    required:true,
},
year: {
    type:Number,
    required:true
},
result:[subject]
});

    var studentresult=mongoose.Schema({
        uid:{
            type:String,
            required:true
        },
        results:[resultschema]
    });

    return mongoose.model(coll_name,studentresult,coll_name);
}

exports.exp=myfunction;