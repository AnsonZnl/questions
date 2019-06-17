var express = require('express');
var router = express.Router();
var answerModel = require('./db.js').answerModel;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query);
      let answer={
        id: req.query.id,
        date: req.query.date,
        name: req.query.name,
        age: req.query.age,
        city: req.query.city,
        optionAnswer: JSON.parse(req.query.optionAnswer)
      }
      answerModel.create(answer, (err)=>{
        if(!err){
            console.log('插入成功！')
        }else{
            throw err;
        }
      });
  });
  
  module.exports = router;
  