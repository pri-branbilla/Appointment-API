const createError = require('http-errors');
const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const mongologin = require('./config/mongodb.json')

const appointmentsRouter = require('./routes/appointments');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/appointments', appointmentsRouter);

function init() {
  mongoose.connect(
    `mongodb://${mongologin.username}:${mongologin.password}@ds155097.mlab.com:55097/appointmentdb`,
    {
      useNewUrlParser: true,
    });
  // Initialize the Firebase Admin SDK
  console.log('Firebase Admin SDK initialized.');
  let configFile = require('./config/sak.json');
  let adminConfig = {
      credential: admin.credential.cert(configFile)
  };
  admin.initializeApp(adminConfig);
}

init();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  })
});

module.exports = app;
