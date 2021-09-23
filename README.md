# YelpCamp

This is repository for project based on the course The Web Developer Bootcamp by Colt Steel.
It's server side rendered website created mainly in Node.js and Express, using MongoDB base.
It allows you to browse offers of rental campgrounds and post your own.

## Ok, but how I can see it working?

I never deployed this project into production. If you realy want to see it working you have to run it localy.
To do so you need to have installed Node.JS, MongoDB. Then clone this repo and run npm install to download all dependencies.
Starting point is the app.js. Database should be running on default port 27017. On top of that it uses few APIs, Mabpox and Cloudinary. You'll need keys for those.

## Breaking down the repo

#### [controllers](https://github.com/lukbast/YelpCamp/tree/main/controllers) - contains code executed on each route of the server. It's splited into 3 parts campground, user and review routes.
#### [img](https://github.com/lukbast/YelpCamp/tree/main/img) - images
#### [models](https://github.com/lukbast/YelpCamp/tree/main/models) - contains models for database objects
#### [public](https://github.com/lukbast/YelpCamp/tree/main/public) - folder for styles and scripts used on the client side
#### [routes](https://github.com/lukbast/YelpCamp/tree/main/routes) - contains code with routes definitions
#### [seeds](https://github.com/lukbast/YelpCamp/tree/main/seeds) - scripts for seeding development database to have some data to work on.
#### [utils](https://github.com/lukbast/YelpCamp/tree/main/utils) - utility functions
#### [views](https://github.com/lukbast/YelpCamp/tree/main/views) - contains HTML with EJS that is rendered and displayed on the client side. 
