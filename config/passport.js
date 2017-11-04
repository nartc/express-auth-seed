const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const config = require('./keys');

const User = require('../models/User');

module.exports = (passport) => {
    let options = {};

    options.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = config.secretKEY;

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.getUserById(jwt_payload.user._id, (err, user) => {
            if(err) {
                return done(err, false);
            }

            if(user) {
                return done(null, user, {issuedAt: jwt_payload.iat});
            } else {
                return done(null, false);
            }
        });
    }));
}