// Model.deleteOne(conditions,callback);
const express = require('express');
const router = express.Router();
const answerModel = require('../models/db.js').answerModel;

/* GET home page. */
router.get('/', function(req, res, next) {
      answerModel.deleteOne({
          id: req.query.id
      },(err,data)=>{
        if(!err){
            res.send(data)
        }else{
          throw err
        }
      });
  });
  
  module.exports = router;
  