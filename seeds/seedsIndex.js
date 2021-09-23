const { once } = require("events");
const mongoose = require("mongoose");
const Campground = require('../models/campground')
const cities = require("./cities");
const {places, descriptors} = require('./seedHelpers');
const imagess = require('./images')
mongoose.connect("mongodb://localhost:27017/yelp-camp",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("------database connected------");
})

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async ()=>{
    await Campground.deleteMany({});
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam mollitia eos, ipsam dolor iure quo hic. At architecto pariatur, consequuntur ut debitis totam quia dolorum quaerat, aspernatur, a aut reiciendis.';
    
    for(let i =0; i<600; i++){

        const imageIndex0 =  Math.floor(Math.random()*imagess.length)
        const imageIndex1 =  Math.floor(Math.random()*imagess.length)
        const imageIndex2 =  Math.floor(Math.random()*imagess.length)
        
        const randomCityIndex = Math.floor(Math.random()*1000);
        const randomPrice = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            author: '6040af4085a7f91ef04c0ad2',
            location: `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                imagess[imageIndex0],
                imagess[imageIndex1],
                imagess[imageIndex2]
            ],
            description: lorem,
            price: randomPrice,
            geometry : {
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude
                ],
                type: "Point"
            }
        });
        await camp.save();
    }
}



seedDB().then(()=>{
    mongoose.connection.close();
})
