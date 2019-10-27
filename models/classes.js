const mongoose= require("mongoose");

let myFunction= function classes(clg_name) {
    
    const classes= mongoose.model({
        clsname:{
            type:String,
            required:true
        },
        clsmembers:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:clg_name+'users'
        }]
    });

    return mongoose.model(clg_name+'classes',classes,clg_name+'classes');
}

exports.exp=myFunction;