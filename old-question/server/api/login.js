const express =require('express');
const router = express.Router();
const userModel = require('../models/db').userModel

router.get('/',(req, res)=>{
        let userName= req.query.user;
        let pass = req.query.pass;
        console.log(pass)
    userModel.findOne({userName: userName},(err,data)=>{
        try{
        if(!err){
            console.log(data.pass == pass)
            // res.cookie('znl', 'kjh', {maxAge: 60 * 1000, httpOnly: true}) // 该处是设置 cookie 与 httpOnly 
            
            if(data.pass == pass){
                res.send('登陆成功');
            }else{
                res.send('密码错误')
            }
        }else{
            // res.send('账号不存在'+err)
            throw err;
        }
    }catch(err){
        console.log(err);
        res.send('用户名不存在')
    }
    })
})

module.exports = router