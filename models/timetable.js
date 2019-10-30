const mongoose = require("mongoose");
var Schema=mongoose.Schema;

const daytimetable=new Schema({
    sub:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    });

const weektimetable= new Schema({
day:{
type: String,
required:true,
unique: true,
enum:['mon','tue','wed','thu','fri','sat']
},
daytimetable:[daytimetable]
});

const ttschema=new Schema({
clsname:{
    type: String,
    required: true
},
weektimetable:[weektimetable]
});

let Myfuntion= function(collection) {

    return mongoose.model(collection,ttschema,collection);
}

exports.exp=Myfuntion;