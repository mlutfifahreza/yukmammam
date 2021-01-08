const mongoose = require('mongoose');
const foods = require('./foods');
const Food = require('../models/food');

mongoose.connect('mongodb://localhost:27017/yukmammam', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Food.deleteMany({});
    for (let i = 0; i < foods.length; i++) {
        const food = new Food({
            title : foods[i].title,
            price : foods[i].price,
            description : foods[i].description,
            image : foods[i].image
        })
        // console.log(food);
        await food.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

module.exports = {
    foods : foods,
    seedDB : seedDB
}