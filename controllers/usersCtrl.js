const User = require('../models/user');


module.exports.getRegister =  (req, res)=>{
    res.render('users/register')
}

module.exports.postRegister = async (req, res)=>{
    const {email, username, password} = req.body.user;
    try {
        const user = new User({email, username});
        const regUser = await User.register(user, password);
        req.login(regUser, err =>{
            if(err) return next(err);
            req.flash('success', `Registered successfully, welcome to YelpCamp, ${username}!`)
            res.redirect('/campgrounds')
        })
    } catch (e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.getLogin = async (req, res)=>{
    res.render('users/login');
}


module.exports.postLogin = async (req, res) =>{
    req.flash('success', `Welcome back, ${req.body.username}`);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout =  (req, res)=>{
    req.logout();
    req.flash('success', 'Successfully logged You out.')
    res.redirect('/campgrounds')
}