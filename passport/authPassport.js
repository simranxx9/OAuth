const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const user = require('../model/user');

// take the id for the cookie
passport.serializeUser((user,done)=>{
        done(null,user.id);
    }
)

//fetch info from the id  after this only the req,res will work of route /google/redirect
passport.deserializeUser((id,done)=>{
    user.findById(id).then(user=>{
        done(null,user);
    })
 }
)

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientId ,
        clientSecret: keys.google.clientSecret

    },(accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        //callback passport function
        user.findOne({userId:profile.id}).then(User=>{
            if(User)
            {
                console.log('user exist ' +User);
                done(null,User);
            }
            else{
                new user({
                    name : profile.displayName,
                    userId: profile.id,
                    thumbnail:profile._json.picture
    
                    }
                ).save().then(User=>{
                    done(null,User);
                })
            }
        });
       
    
    })
)
