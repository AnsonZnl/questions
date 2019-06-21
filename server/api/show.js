var express = require('express');
var router = express.Router();
var answerModel = require('../models/db.js').answerModel;

router.get('/:id', function(req, res){
    console.log(req.params.id);
    console.log(res.cookies)
    answerModel.findOne({
        id: req.params.id
    },(err, data)=>{
        if(!err){
            //设置cookie
            res.send(data)
        }else{
            throw err
        }
    })
})

module.exports = router;