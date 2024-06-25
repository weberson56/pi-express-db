var express = require('express');
var router = express.Router();



/* GET home page. */
  router.get('/', function(req, res, next,) {
    const now = new Date()
    const name = {
    title: "Express",
    name: "weberson",
    data: [now.getDate(), now.getMonth(), now.getFullYear(),s()].join(' \\ '),
    hora: [now.getHours(),now.getMinutes(), now.getSecond].join(' \\ ')
  }
  res.render('index', name);
  });

module.exports = router;
