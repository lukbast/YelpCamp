const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const usersCtrl = require('../controllers/usersCtrl')
const passport = require('passport');

router.route('/register')
    .get(usersCtrl.getRegister)
    .post(catchAsync ( usersCtrl.postRegister));

router.route('/login')
    .get(usersCtrl.getLogin)
    .post(passport.authenticate('local',{ failureFlash: true, failureRedirect:'/login'} ), usersCtrl.postLogin);

router.get('/logout',usersCtrl.logout)


module.exports = router;