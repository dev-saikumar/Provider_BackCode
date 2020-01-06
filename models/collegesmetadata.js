const mongoose= require('mongoose');

const allcollgschema= mongoose.Schema({
clgname:{
    type:String,
    required: true
},
logo:{
    type: String,
    required:true,
},
address:{
    type: String,
    required:true
},
loc:{
    type:[Number],
    index: '2d'
}
});

module.exports=mongoose.model('collegemodel',allcollgschema,'collegesmetadata');