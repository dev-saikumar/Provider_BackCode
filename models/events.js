const mongoose = require('mongoose');
var Schema= mongoose.Schema;

const eventModel=Schema({
name:{
    type:String,
    required: true
},
clgid:{
    type:String,
    required:true,
    index:true
},
ts:{
    type:String,
    required: true
},
venue:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
details:{
    type:String,
    required:true
},
loc:{
    type:[Number],
    index: '2d'
}
});

module.exports= mongoose.model('events',eventModel,'events');
