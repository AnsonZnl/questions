var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 路由
// 以下 配置允许跨域请求； **********一定要放在上面**********
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
})



app.get('/', function (req, res) {
  res.send('hello, express')
})

app.get('/users/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})


// api
var getArticleList = require('./models/get_article_list')
var getForm = require('./models/get_form.js')
var postForm = require('./models/post_form.js')
var deletes = require('./models/delete.js')
var shows = require('./models/show.js')
var updata = require('./models/updata.js')

app.use('/get_article_list', getArticleList)
app.use('/get_form', getForm)
app.use('/post_form', postForm)
app.use('/delete', deletes)
app.use('/show', shows)
app.use('/updata', updata)




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
