var express = require('express');
var router = express.Router();
let formidableMiddleware = require('express-formidable');

router.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: 'public/images',//保存图片的目录
    multiples: true, // req.files to be arrays of files
    keepExtensions: true//保留后缀
  }))

/* POST home page. */
router.post('/', function(req, res, next) {
    console.log('图片地址：'+req.files.file.path);
    console.log(req.fields);
  });
  
module.exports = router;
