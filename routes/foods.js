const express = require('express');
const router = express.Router();
const foods = require('../controllers/foods');
const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

const Food = require('../models/food');

router.route('/')
    .get(catchAsync(foods.index))
    .post(catchAsync(foods.addFood))

router.route('/edit')
    .get(catchAsync(foods.edit))

router.get('/add', foods.renderAddFoodForm)

router.route('/:id')
    .get(catchAsync(foods.showFood))
    .put(catchAsync(foods.updateFood))
    .delete(catchAsync(foods.deleteFood));

router.get('/:id/edit', catchAsync(foods.renderEditFood))

module.exports = router;