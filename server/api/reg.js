const express =require('express');
const router = express.Router();
const userModel = require('../models/db').userModel
let formidableMiddleware = require('express-formidable');

router.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: 'public/images',//保存图片的目录
    multiples: true, // req.files to be arrays of files
    keepExtensions: true//保留后缀
  }))


router.post('/',(req, res)=>{
    let data = req.fields
    console.log(data)
    let userData={
        userName: data.user,
        pass: data.pass,
        email: data.email
    }
    userModel.create(userData,(err,data)=>{
        if(!err){
            res.send(data)
        }else{
            throw err;
        }
    })
})
module.exports = router