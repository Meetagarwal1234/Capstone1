const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const passport = require('./config/passport');
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/civilloan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

const serviceRoutes = require('./routes/services');
const memberRoutes = require('./routes/member');
const loanRoutes = require('./routes/loans');
app.use('', serviceRoutes);
app.use('', memberRoutes);  // Only use this line once
app.use('', loanRoutes);  // Make sure you're using this as well

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
