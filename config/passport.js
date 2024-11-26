const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Member = require('../models/Member'); 

passport.use(
    new LocalStrategy(
        { usernameField: 'mobile', passwordField: 'password' }, 
        async (mobile, password, done) => {
            try {
                const user = await Member.findOne({ mobile });
                if (!user) {
                    return done(null, false, { message: 'Incorrect mobile number' });
                }
                const isMatch = await bcrypt.compare(password, user.createpassword);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Member.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
