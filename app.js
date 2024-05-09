var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

console.log(process.env.DB_HOST)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const productsRouter = require("./routes/products");

/*--  workshop --*/
const shopsRouter = require("./routes/shops");
const approveRouter = require("./routes/approve");
const orderRouter = require("./routes/orders");
/*--  workshop --*/

var app = express();

var cors = require('cors')

const mongoose = require('mongoose')
const { DB_HOST, DB_PORT, DB_NAME } = process.env

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`).then(() => {
  console.log('DB connect!!')
}).catch(err => {
  console.log('DB connect fail !!')
})

app.use(cors())

// require = require("./db")
require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products", productsRouter);

/*--  workshop --*/
app.use("/shops", shopsRouter);
app.use("/approve", approveRouter);
app.use("/orders", orderRouter);
/*--  workshop --*/

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
