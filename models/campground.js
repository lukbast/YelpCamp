// const { function } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')
const options = {toJSON: {virtuals: true}}; // options: virtuals are passed to JSON


const ImageSchema = new Schema({
        url: String,
        filename: String
})

ImageSchema.virtual("thumbnail").get(function (){
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema ({
    title: String,
    images: [
        ImageSchema
    ],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, options);

CampgroundSchema.virtual('properties.mapPopup').get(function (){
    return `sampleText`
})

CampgroundSchema.post('findOneAndDelete', async function (camp){
    if(camp.reviews.length){
        const res = await Review.deleteMany({_id: {$in: camp.reviews} });
        console.log(res)
    }

})


module.exports = mongoose.model('Campground', CampgroundSchema);