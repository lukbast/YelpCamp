//Shit ton of requires

if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const { once } = require("events");
const express =  require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const campgroundsRoutes = require('./routes/campgrounds')
const reviewsRoutes = require('./routes/review')
const usersRoutes = require('./routes/users')
const ExpressError = require("./utils/ExpressError");
const session = require('express-session');
const sessionConfig = require('./utils/sessionConfig');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//executing Express
const app = express();

//Connecting to Mongo DB
mongoose.connect("mongodb://localhost:27017/yelp-camp",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("------database connected------");
});



//Sessions, config in separate file in utils
app.use(session(sessionConfig));

//Flash for displaying temporary messages
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Flash's middleware
app.use((req, res, next) =>{
    res.locals.user = req.user; // passing user's info from session
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    
    next();
});


//Parsing a req.body
app.use(express.urlencoded({extended:true}))

//Using different HTTP requests
app.use(methodOverride('__method'))


//serving public directory
app.use(express.static(path.join(__dirname, "public")))

//Templating egnine's stuff
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Campgrounds router
app.use('/campgrounds', campgroundsRoutes)

//Review router
app.use('/campgrounds/:id/reviews' , reviewsRoutes )

//Users router
app.use('/', usersRoutes)

// Home page route
app.get('/', (req, res) =>{
    res.render('home')
});

//route for 404. triggers when Express didn't find the route specified in request
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404))
})


//error handlling middleware (or more like endware hehehe)
app.use((err, req, res , next)=>{
    if(!err.message) err.message = "Something went wrong"
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).render('error.ejs', {err})
})


//Turning on listening for incoming request on specified port
app.listen(3000, ()=>{
    console.log("-------YelpCamp listening on port 3000-------");
})