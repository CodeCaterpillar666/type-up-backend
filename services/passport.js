require('dotenv').config()
const mongoose = require('mongoose');
const User = mongoose.model('user');

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const keys = require('../config/keys');
console.log(keys)

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({googleId: profile.id})
      .then((err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!user) {
          console.log("Create a new user based on goole id");
          const newUser = new User({
            googleId: profile.id,
            username: profile.name.givenName
          });
          console.log(newUser);
          newUser.save()
          .then(() => done(null, newUser));
        } else {
          console.log("User already exists");
          done(null, user);
        }
      })
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({githubId: profile.id})
      .then((err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!user) {
          console.log("Create a new user based on goole id");
          const newUser = new User({
            githubId: profile.id,
            username: profile.username
          });
          console.log(newUser);
          newUser.save()
          .then(() => done(null, newUser));
        } else {
          console.log("User already exists");
          done(null, user);
        }
      })
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
