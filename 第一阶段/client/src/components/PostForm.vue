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
            name: 'znl',
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
            axios.post('http://127.0.0.1:3000/post_form', formData, config)
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
}
}
</script>
