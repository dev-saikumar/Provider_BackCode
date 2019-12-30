const mongoose = require('mongoose');
const schema = mongoose.Schema;

var event = schema({
    title: String,
    description: String,
    image: String,
    host: String,
    branch: [String],
    fee: String,
    time: String,
    year: [String]
});

module.exports = function(name){
    return mongoose.model(name, event, name);
}
