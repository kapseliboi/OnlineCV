const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ username: jwt_payload.username }, (err, user) => {
        if (err) {
          console.log(err);
          return done(null, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
