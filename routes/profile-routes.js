const express = require('express');

const router = express.Router();

//so that if the user is not logged in he cant go to profile check
const authCheck = (req,res,next) =>{
    if(!req.user)
    {
        res.redirect('/auth/login');
    }
    else{
        next();
    }
}

router.get('/',authCheck,(req,res)=>{
    res.render('profile',{user:req.user});
})

module.exports = router;