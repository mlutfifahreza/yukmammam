const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const session = require('express-session');
// const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const User = require('./models/user');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const userRoutes = require('./routes/users');
const foodRoutes = require('./routes/foods');
// const reviewRoutes = require('./routes/reviews');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yukmammam';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/foods', foodRoutes)

app.get('/', (req, res) => {
    res.render('home')
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })