var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var data = require('../data/data.json')
router.get('/foods', (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.send(data)
})
module.exports = router;
