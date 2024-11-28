const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: "316466451928-ccb2vcjri9v087l4krklmj641renqamd.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4200/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null, // No se almacena contraseña para usuarios de Google
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
