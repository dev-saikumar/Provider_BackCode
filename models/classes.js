const mongoose= require("mongoose");
var Schema=mongoose.Schema;


const classes= new Schema({
    clsname:{
        type:String,
        required:true
    },
    clsmembers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:clg_name+'users'
    }]
});
let myFunction= function classes(clg_name) {

    return mongoose.model(clg_name+'classes',classes,clg_name+'classes');
}

exports.exp=myFunction;