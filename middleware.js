const Campground = require('./models/campground')
const campgroundSchema  = require('./models/joiValidationSchemas')
const ExpressError = require("./utils/ExpressError");
const reviewSchema = require('./models/joiValidateRev');




module.exports.isLoggedIn = (req, res, next) =>{

    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged to perform this action')
        return res.redirect('/login')
    }

     next();
}

module.exports.isPermited = async (req,res, next) =>{
    const {id} = req.params;
    const camp =  await Campground.findById(id);
    if(!camp){
        req.flash('error', "Couldn't find a campground");
        res.redirect('/campgrounds')
    }
    if(!camp.author.equals(req.user._id)){
        req.flash('error', "You have to be owner of a post to be able to perform this action it");
        res.redirect(`/campgrounds/${camp._id}`)
    }
    next();
}


module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate({...req.body});
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else{
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else{
        next();
    }
}

