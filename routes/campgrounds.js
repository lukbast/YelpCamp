const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isPermited, validateCampground} = require('../middleware');
const campgroundsCtrl = require('../controllers/campgroundsCtrl');
const {storage} = require('../utils/cloudinaryConfig');
const multer = require('multer');
const upload = multer({storage});



router.route('/')
    .get(catchAsync( campgroundsCtrl.index ))
    .post( isLoggedIn, upload.array('image'), validateCampground,  catchAsync (campgroundsCtrl.postNewForm));

    //Helper in geeting url for seed images
    // .post(upload.array('image'), (req, res)=>{
    //     const simages = req.files.map(f => ({url: f.path, filename: f.filename}));
    //     res.send(simages)
    // })

router.get('/new', isLoggedIn , campgroundsCtrl.renderNewForm);


router.route('/:id')
    .get(catchAsync(campgroundsCtrl.show))
    .delete(isLoggedIn, isPermited, catchAsync (campgroundsCtrl.delete));

router.route('/:id/edit')
    .get(isLoggedIn, catchAsync (campgroundsCtrl.renderEditForm))
    .put(isLoggedIn, isPermited, upload.array("image"), validateCampground, catchAsync (campgroundsCtrl.postEditForm ));



module.exports = router;