require('dotenv').config();
const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const PORT = process.env.PORT || 8080;

const mongodb = require('./data/database');
const app = express();

app.use(bodyParser.json());

// Set up express-session
app.use(session({
    secret: 'secret', // In production, make this a random string
    resave: false,
    saveUninitialized: true,
}));

// Initialize passport and tie it to the session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        // According to the video, we're keeping it simple and just returning the profile
        // In a more complex app, you'd check your MongoDB for the user here using a 'findOrCreate' method
        return done(null, profile);
    }
));

// Passport serialization/deserialization setup
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers', 
//         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });

mongodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to MongoDB. Error: ', err);
    } else {
        // Only listen on the port if we are NOT running tests
        if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.log(`Database is running and node is listening on port ${PORT}`);
            });
        }
        console.log('Connected to MongoDB.');
    }
});

app.use('/', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong on the server!',
    });
})
// app.listen(PORT, () => {console.log(`Running on port: ${PORT}`)});
module.exports = app;
