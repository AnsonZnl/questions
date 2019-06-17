const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/form", {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!')
　　}
})

// get_form 提交答案
//2. 新建Schema （表/ 模式对象） 定义规则/字段的规则
const Schema= mongoose.Schema;
//定义answerSchema的字段（规则）
let answerSchema= new Schema({
    id: {type: String, require: true},
    date: {type: String, require: true},
    name: {type: String, require: true},
    age: Number,
    city: String,
    optionAnswer: Object
});
//3. 创建model并导出
exports.answerModel= mongoose.model('answer', answerSchema);

// 获取答案

