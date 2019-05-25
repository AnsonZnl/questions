var express = require('express');
var router = express.Router();
var answerModel = require('./db.js').answerModel;

/* GET home page. */
router.get('/', function(req, res, next) {
      answerModel.find({},(err,data)=>{
        if(!err){
            res.send(data)
        }else{
          throw err
        }
      });
  });
  
  module.exports = router;
  