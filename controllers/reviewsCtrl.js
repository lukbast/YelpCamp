const Review = require('../models/review')
const Campground = require('../models/campground')

module.exports.delete = async (req, res) =>{
    const {id, rev} = req.params
    const review = await Review.findById(rev)

    if(review.author.equals(req.user._id)){
        Campground.findByIdAndUpdate(id, { $pull:  {reviews: rev }})
        await Review.findByIdAndDelete(rev);
        req.flash('success', 'Review successfully deleted.');
        res.redirect(`/campgrounds/${id}`);
    }   else {
        req.flash('error', 'You must be author of review in order to delete one.');
        res.redirect(`/campgrounds/${id}`);
    }
}

module.exports.post = async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    if(!camp){
        req.flash('error', "Couldn't find a campground");
        res.redirect('/campgrounds')
    }
    const review = new Review(req.body.review)
    review.author = req.user._id;
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash('success', 'Successfully created a new review');
    res.redirect(`/campgrounds/${req.params.id}`)
}

module.exports.redirect1 = (req,res)=>{
    res.redirect(`/campgrounds/${req.params.id}`)
}

module.exports.redirect2 =  (req,res)=>{
    res.redirect(`/campgrounds/${req.params.id}`)
}


