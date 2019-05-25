> 最近在折腾一个cms系统，用的vue+express，但是就一个表单提交就弄了好久，记录一下。

## 环境：
服务：Node10+
前端：Vue 2.x
后端：Express 4.x
数据库：MongoDB

## 技术栈：
- vue
- express
- axios
- express-formidable
- element-ui

使用vue +express 做一个表单提交的练手demo
可用于做问卷调查。

## 文件目录：
新建blog-cms文件。
- 在blog-cms文件下新建client文件夹存放前端文件
- 在blog-cms文件下新建server存放后端文件。

![161558680390_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-be85128752aaa974.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 配置vue环境
在client文件下使用[vue-cli](https://cli.vuejs.org/zh/guide/installation.html)工具，快速生成一个vue项目。
- 输入vue-cli安装命令：
`npm install vue-cli -g`
- 初始化一个模板（随心回车即可）
`vue init webpack`
- 启动：
`npm start`
- 然后打开浏览器`http://localhost:8080/#/`    
看到：
![171558680667_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-7307fc7fb9c0cbfd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

表示安装成功！
## 配置express环境
打开server文件夹，安装express，我们使用[express 生成器](http://www.expressjs.com.cn/starter/generator.html)，来快速生成一个express项目。
- 安装express-generator：
`npm install express-generator -g`
- 生成Express 应用：
`express --view=ejs`
- 下载依赖：
`npm i`
- 然后启动项目：
`npm start`
- 浏览器打开`http://localhost:8080/#/`    
看到：

![181558680955_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-1491a6ef1b6b60a7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

就说明安装成功了！

然后在server目录下新建models，在models下新建get_article_list.js文件并写入：
```
 /* 目录：server/models/get_article_list.js */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('文章列表 响应成功！')
  });
 
  module.exports = router;

```
然后在server/app.js中添加代码：
```
var app=express();//这个一定要在上面
var getArticleList = require('./models/get_article_list')
app.use('/get_article_list', getArticleList)
```
然后重启服务，在浏览器打开：`http://localhost:3000/get_article_list`，    
显示如图，表示成功。

![191558681652_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-6211f8946f63828d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 添加axios
在vue中使用axios请求后端接口，
- 在client下，下载axios
`npm i axios --save`
- 然后更改client/src/components/HelloWorld.vue:
```
<template>
  <div>
   <h1>{{this.msg}}</h1>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  created() {
    axios.get('http://localhost:3000/get_article_list')
    .then(res=>{
      this.mas= res.data
    }).catch(err=>{
      console.log(err);
    })
  },
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

```
之后打开浏览器发现报错，

![201558683480_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-a55ea94d2042fd43.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是因为跨域，我选择使用[cros](https://www.cnblogs.com/happyflyingpig/p/8118818.html)解决。
直接在后端server/app.js添加：
```
var app = express()//在他的下面
// 允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
})
// api
var getArticleList = require('./models/get_article_list')
app.use('/get_article_list', getArticleList)
```
然后重启服务器(在server下)执行`npm start`，然后再看了前端。就OK了，


![211558684671_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-e5bd2b3bd896b411.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

参考：[不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029)

## 使用elementUI
为了做出的东西好看一点，选择一个使用elementUI作为UI库。
[elementUI官网](https://element.eleme.cn/#/)
- client下下载`npm i element-ui --save`
- 然后在main.js里使用：
```

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

## get方法提交 前端代码
在 client/src/components下新建GetForm.vue：
```
<template>
    <div>
        <h2>get请求</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'App',
    data () {
        return {
            form:{
                title: 'title',
                content: 'content'
            }
        }
    },
    methods: {
        onSubmit(){
            axios.get('http://127.0.0.1:3000/get_form',{
                params: this.form
            },{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
}
}
</script>
```
然后在client/src/router/index.js下添加GetForm的路由：
```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GetForm from '@/components/GetForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/get_form',
      name: 'GetForm',
      component: GetForm
    }
  ]
})

```
然后更改client/src下的App.vue，添加一个GetForm跳转按钮：
```
<template>
  <div id="app">
    <div class="nav">
      <router-link to='/'>HelloWold</router-link>
      <router-link to='/get_form'>get form</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
之后打开`http://localhost:8080/#/get_form`看到
![221558686564_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-52e0021830f1ede0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
表示成功。

## get方法提交 后端
在server/models下新建get_form.js，输入：
```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query)
  });
  
  module.exports = router;
  
```
在server/app.js新增get_from的接口：
```
// api
var getForm = require('./models/get_form.js')
app.use('/get_form', getForm)
```
然后重启后端服务器；
在前端中提交表单，就可以在后端的命令行工具上看到提交的信息了.
![231558687197_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-55df6e4e3b778476.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## post方法提交 前端

在client/src/components下添加PostForm.vue：
```
<template>
    <div>
        <h2>post请求</h2>
        <div>
           <form>
                <input type="text" value="" v-model="name" placeholder="请输入用户名">
                <input type="text" value="" v-model="age" placeholder="请输入年龄">
                <input type="file" @change="getFile($event)">
                <button @click="submitForm($event)">提交</button>
            </form>
        </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'PostForm',
    data () {
        return {
            age: '19',
            file: ''
        }
    },
    methods: {
          // post文件上传
        getFile(event){
            this.file = event.target.files[0];
            console.log(this.file);
        },
        submitForm(event){
             event.preventDefault();
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('age', this.age);
            formData.append('file', this.file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            axios.post('http://127.0.0.1:3000', formData, config)
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
}
}
</script>

```
同理，给PostForm添加路由和导航，
在client/src/router/index.js里：
```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GetForm from '@/components/GetForm.vue'
import PostForm from '@/components/PostForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/get_form',
      name: 'GetForm',
      component: GetForm
    },
    {
      path: '/post_form',
      name: PostForm,
      component: PostForm
    }
  ]
})

```
APP.vue中;
```
<template>
  <div id="app">
    <div class="nav">
      <router-link to='/'>HelloWold</router-link>
      <router-link to='/get_form'>get form</router-link>
      <router-link to="/post_form">post form</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
## post方法提交 后端代码
post 提交的表单里有图片文件，这里需要借助一个插件[express-formidable](https://www.npmjs.com/package/express-formidable)
- 在sever下 下载`npm install express-formidable --save`
- 在server/models下新建post_form.js
```
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


```
照旧；在server/app.js里添加：
```
var postForm = require('./models/post_form.js')
app.use('/post_form', postForm)
```
然后重启服务器，然后去前端提交表单(包括图片)。
在后端显示这样表示成功了！
![251558691887_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-925fbea8cff434ba.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下一章 ：把提交的数据的插入到mongoDB数据库里

**参考：**
- 分别安装express和Vue：https://www.jianshu.com/p/f0e292508d14
- 搭建一个VUE+Express前后端分离的开发环境:https://blog.csdn.net/yuyuking/article/details/82856944

源码在github（欢迎star）：[从零做一个问卷调查系统（一）](https://github.com/AnsonZnl/blog-cms/tree/master/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5)