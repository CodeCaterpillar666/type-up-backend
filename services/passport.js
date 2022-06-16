const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const keys = require('../config/keys');
console.log(keys)

passport.use(
  new GoogleStrategy(
    {
      clientID: `${keys.googleClientID}`,
      clientSecret: `${keys.googleClientSecret}`,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: `${keys.githubClientId}`,
      clientSecret: `${keys.githubClientSecret}`,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
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
