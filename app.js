require('dotenv').config();
const mongoose = require('mongoose');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ROUTERS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// ------------------------------
// CONNECT TO MONGODB
// ------------------------------
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.error('Error connecting to MongoDB');
  });


// ------------------------------
// VIEW ENGINE
// ------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// ------------------------------
// MIDDLEWARE
// ------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));


// ------------------------------
// ROUTES
// ------------------------------
app.use('/', indexRouter);

// IMPORTANT FIX:
// Mount your users router at /api/users
app.use('/api/users', usersRouter);


// ------------------------------
// ERROR HANDLING
// ------------------------------

// 404 handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error renderer
app.use(function(err, req, res, next) {
  res.locals.message = err.message;

  // show stacktrace only in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
