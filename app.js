const express = require('express');
const authRouter = require('./routes/auth-router');
const GoogleSetup = require('./passport/authPassport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRouter = require('./routes/profile-routes');

const app = express();

app.set('view engine','ejs');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.key.cookieKey]
}));

//initiate the passport

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.url,
    { useNewUrlParser: true ,useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);


app.use('/auth',authRouter);

app.use('/profile',profileRouter);

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(process.env.port||3000,()=>{
    console.log('Running on the port...');
})