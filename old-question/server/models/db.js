const mongoose= require('mongoose');
mongoose.connect("mongodb://localhost:27017/form", {
    useNewUrlParser:true
}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!')
　　}
})
const Schema= mongoose.Schema;

// question
let answerSchema= new Schema({
    id: {type: String, require: true},
    date: {type: String, require: true},
    name: {type: String, require: true},
    age: Number,
    city: String,
    optionAnswer: Object
});
exports.answerModel= mongoose.model('answer', answerSchema);

// user
let userSchema= new Schema({
    userName: {type: String, require: true},
    pass: {type: String, require: true},
    email: {type: String, require: true}
});
exports.userModel= mongoose.model('User', userSchema);

