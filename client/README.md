# client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
打包事项：https://blog.csdn.net/qq_15901351/article/details/83043062
- 打包事项：
    - 解决打包时的css背景图片路径问题：build/utils.js 下的ExtractTextPlugin.extract下添加：`publicPath:'../../'`
    - 修改config/index.js下的`assetsPublicPath: '/'`改为：`assetsPublicPath: './',`
    - productionSourceMap默认是true改为false