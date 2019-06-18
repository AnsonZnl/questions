var express = require('express');
var router = express.Router();
var answerModel = require('./db.js').answerModel;

router.get('/:id', function(req, res){
    console.log(req.params.id);
    answerModel.findOne({
        id: req.params.id
    },(err, data)=>{
        if(!err){
            res.send(data)
        }else{
            throw err
        }
    })
})

module.exports = router;