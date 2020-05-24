var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('文章列表 响应成功！')
  });
  
  module.exports = router;
  