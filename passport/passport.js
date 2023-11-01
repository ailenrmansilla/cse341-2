const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(new googleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/redirect',
        },
        async (accessToken, refreshToken, profile, done) => {
        //   const newUser = {
        //     googleId: profile.id,
        //     displayName: profile.displayName,
        //     firstName: profile.name.givenName,
        //     lastName: profile.name.familyName
        //   }
  
        //   try {
        //     let user = await User.findOne({ googleId: profile.id })
  
        //     if (user) {
        //       done(null, user)
        //     } else {
        //       user = await User.create(newUser)
        //       done(null, user)
        //     }
        //   } catch (err) {
        //     console.error(err)
        //   }
            //but in the other video
        console.log('Passport callback function fired');
        console.log(profile)
        new User({
            googleId: profile.id,
            username: profile.displayName
            }).save().then((newUser) => {
                console.log('New user created: ', newUser);
        });
        }
      )
    )
  
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user))
    })
  }