const app = require("../app");

app.use("/", indexRouter);
app.use("/users", usersRouter);

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('method get');
  });