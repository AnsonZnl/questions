var express = require('express');
var router = express.Router();
var answerModel = require('../models/db.js').answerModel;

router.get('/', function(req, res){
    var data = JSON.parse(req.query.data);
    answerModel.updateOne({
        id: req.query.id,
    },{
        date: data.date,
        name: data.name,
        age: data.age,
        city: data.city,
        optionAnswer: data.optionAnswer
    },(err, data)=>{
        if(!err){
            res.send(data)
        }else{
            throw err
        }
    })
})

module.exports = router;