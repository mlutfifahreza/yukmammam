const mongoose = require('mongoose');
// const Review = require('./review')
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    image : String
});
// }, opts);

module.exports = mongoose.model('Food', FoodSchema);