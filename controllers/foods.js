const Food = require('../models/food');

module.exports.index = async (req, res) => {
    const foods = await Food.find({});
    res.render('foods/index', { foods });
    // res.render('foods/new');
}

module.exports.renderAddFoodForm = (req, res) => {
    res.render('foods/add');
}

module.exports.addFood = async (req, res, next) => {
    const food = new Food(req.body.food);
    await food.save();
    console.log(food);
    res.redirect('/foods');
}

module.exports.showFood = async (req, res,) => {
    const food = await Food.findById(req.params.id);
    if (!food) {
        return res.redirect('/foods');
    }
    res.render('foods/show', { food });
}

module.exports.renderEditFood = async (req, res) => {
    const { id } = req.params;
    const food = await Food.findById(id)
    if (!food) {
        return res.redirect('/foods');
    }
    res.render('foods/edit', { food });
}

module.exports.updateFood = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const food = await Food.findByIdAndUpdate(id, { ...req.body.food });
    await food.save();
    res.redirect(`/foods/${id}`)
}

module.exports.deleteFood = async (req, res) => {
    const { id } = req.params;
    await Food.findByIdAndDelete(id);
    res.redirect('/foods');
}