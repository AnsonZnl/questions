// Model.deleteOne(conditions,callback);
var express = require('express');
var router = express.Router();
var answerModel = require('./db.js').answerModel;

/* GET home page. */
router.get('/', function(req, res, next) {
      answerModel.deleteOne({
          id: req.query.id
      },(err,data)=>{
        if(!err){
            console.log(data)
        }else{
          throw err
        }
      });
  });
  
  module.exports = router;
  