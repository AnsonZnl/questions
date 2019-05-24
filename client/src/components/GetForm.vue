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
    name: 'GetForm',
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