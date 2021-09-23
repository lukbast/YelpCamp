const Campground = require('../models/campground')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAPBOX_TOKEN;
const {cloudinary} = require('../utils/cloudinaryConfig')
const geocoder = mbxGeocoding({accessToken: mbxToken})


module.exports.index = async (req, res) =>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds})

}

module.exports.show =  async (req, res)=>{
    const {id} = req.params;
    const camp = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
          path:  'author'
        }
    }).populate('author');
    if(!camp){
        req.flash('error', "Couldn't find a campground");
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {camp} );
}

module.exports.renderNewForm = (req , res) => {
   res.render("campgrounds/new");
}

module.exports.postNewForm = async (req, res)=>{   
    const geoData = await  geocoder.forwardGeocode ({
        query: req.body.campground.location,
        limit: 1
    }).send();
    const camp = await new Campground(req.body.campground);
    camp.geometry = geoData.body.features[0].geometry
    camp.author = req.user._id;
    camp.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await camp.save();
    req.flash('success', 'Succesfully made a new campground');
    res.redirect(`/campgrounds/${ await camp._id}`);
}

module.exports.renderEditForm = async (req, res) =>{
    const {id} = req.params;
    const camp =  await Campground.findById(id);
    if(!camp){
        req.flash('error', "Couldn't find a campground");
        res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', {camp})
}

module.exports.postEditForm = async (req, res)=>{
    
    const {id} = req.params;
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    camp.images.push(...imgs);
    await camp.save();
    if(req.body.deleteImages){
        for(let img of req.body.deleteImages){
            await cloudinary.uploader.destroy(img);
        }
        await camp.updateOne({ $pull: {images: {filename: { $in: req.body.deleteImages}}}})
        }
    req.flash('success', 'Succesfully edited a campground');
    res.redirect(`/campgrounds/${id}`);


}

module.exports.delete = async (req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Succesfully deleted a campground');
    res.redirect(`/campgrounds`);
}