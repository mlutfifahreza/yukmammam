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

// module.exports.showCampground = async (req, res,) => {
//     const campground = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/show', { campground });
// }

// module.exports.renderEditForm = async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id)
//     if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/edit', { campground });
// }

// module.exports.updateCampground = async (req, res) => {
//     const { id } = req.params;
//     console.log(req.body);
//     const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//     const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
//     campground.images.push(...imgs);
//     await campground.save();
//     if (req.body.deleteImages) {
//         for (let filename of req.body.deleteImages) {
//             await cloudinary.uploader.destroy(filename);
//         }
//         await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
//     }
//     req.flash('success', 'Successfully updated campground!');
//     res.redirect(`/campgrounds/${campground._id}`)
// }

// module.exports.deleteCampground = async (req, res) => {
//     const { id } = req.params;
//     await Campground.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted campground')
//     res.redirect('/campgrounds');
// }