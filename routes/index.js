// import express from 'express';
// var router = express.Router();
global.router = require('express').Router();
var router = global.router;
router = require('./users');
router = require('./product');
router = require('./category');
router = require('./comment');
router = require('./sendMail');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Hello Cee! Nice your get back!' });
});

// export default router;
module.exports = router;
