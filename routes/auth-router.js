const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hey welcome to auth');
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/');
})


module.exports = router;