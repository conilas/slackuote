var express = require('express')
var router = express.Router()

router.use('/quote', require('./quote'))

router.get("/", function(req, res, next) {
  res.render("index.html");
});

module.exports = router
