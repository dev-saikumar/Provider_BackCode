const mongoose= require("mongoose");

let myfunction= function collect(prefix){

var timetable=mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    subname:{
        type: String,
        required: true
    },
    starttime:{
        type: String,
        required: true
    },
    endtime:{
        type:String,
        required:true
    }
});

var examdetailschema= mongoose.Schema({
examname:{
    type: String,
    required: true
},
type:{
    type: String,
    required:true
},
startdate:{
    type: String,
    required:true
},
enddate:{
    type: String,
    required:true
},
timetable:[timetable],
});
return mongoose.model(prefix,examdetailschema,prefix);
}

exports.exp=myfunction;