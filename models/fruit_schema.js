const mongoose = require('mongoose');


//Create fruits schema
const fruitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToEat: Boolean,
}, {timestamps:true});

//Create a model based on fruitScheman
const fruit = mongoose.model('fruit',fruitSchema);

//Export my fruit model 
module.exports = fruit;