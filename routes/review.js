const express = require('express');
const router = express.Router({mergeParams: true}); //option {mergeParams: true} inside brackets allows to pass params from url (default is false)
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, validateReview} = require('../middleware');
const reviewCtrl = require('../controllers/reviewsCtrl')

router.delete('/:rev', isLoggedIn, catchAsync ( reviewCtrl.delete ));

router.post('/', isLoggedIn, validateReview, catchAsync( reviewCtrl.post ))

// if you weren't logged in, those 2 routes below redirect you back to
// campground show page after you log in instead throwing 404.
// Browser is sending GET requests and those routes don't exists
// so I just created them.

router.get('/', reviewCtrl.redirect1)

router.get('/:rev', reviewCtrl.redirect2)

module.exports = router;