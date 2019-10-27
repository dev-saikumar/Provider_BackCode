const mongoose = require("mongoose");

let Myfuntion= function(collection) {

    const daytimetable=mongoose.Schema({
        sub:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        });

const weektimetable= mongoose.Schema({
day:{
    type: String,
    required:true,
    unique: true,
    enum:['mon','tue','wed','thu','fri','sat']
},
daytimetable:[daytimetable]
});

const ttschema=mongoose.Schema({
    clsname:{
        type: String,
        required: true
    },
    weektimetable:[weektimetable]
    });

    return mongoose.model(collection,ttschema,collection);
}

exports.exp=Myfuntion;