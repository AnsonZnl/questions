<template>
    <div>
        <h2>post请求</h2>
        <el-row type="flex" justify="center">
          <el-col :lg="12" :md="16" :sm="22" :xs="22">
            <el-form ref="form" label-width="100px" label-position="top" class="form">
                <el-form-item label="请输入用户名:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="请输入年龄:">
                    <el-input type="textarea" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="添加图片:">
                    <input type="file" @change="getFile($event)">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm($event)">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
          </el-col>
        </el-row>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'PostForm',
    data () {
        return {
            form:{
              name: 'znl',
              age: '19'
            },
            file: ''
        }
    },
    methods: {
        getFile(event){
            this.file = event.target.files[0];
            console.log(this.file);
        },
        submitForm(event){
             event.preventDefault();
            let formData = new FormData();
            formData.append('form',JSON.stringify(this.form))//序列化对象
            formData.append('file', this.file);//文件传输
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
<style  scoped>
.form{
  text-align: left;
}


</style>

