var express = require('express');
var router = express.Router();
var answerModel = require('./db.js').answerModel;

/* GET home page. */
router.get('/', function(req, res, next) {
      let page = parseInt(req.query.page) || 0;//页面
      answerModel.find({},(err,data)=>{
        if(err){throw err; return; }
          let total = data.length;
          answerModel.find({},{},{skip: page, limit: 10},(err,data)=>{
            if(!err){
                res.json({
                  data: data,
                  total: total
                });
            }else{
              throw err
            }
          }).sort({_id: -1});
      });
  });
  
  module.exports = router;
  