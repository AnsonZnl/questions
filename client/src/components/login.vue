<template>
    <div>
        <div class="col">
            <h2>用户登陆</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                
                <el-form-item label="用户名" prop="user">
                    <el-input v-model.number="ruleForm.user"></el-input>
                </el-form-item> 
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <p class="loginBar">随便逛逛，使用 <span @click="testUser">游客账号</span> ，还没有注册？<router-link to="/reg">免费注册</router-link></p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
  export default {
    data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
            if (value.length < 4) {
              callback(new Error('用户名最少四位'));
            } else {
              callback();
            }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          user: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user: [
            { validator: checkUser, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = this.ruleForm
            axios(this.globalFunction.ip+"/login",{
              params: data
            })
            .then((res)=>{
                console.log(res);
                if(res.data === '登陆成功'){
                    alert('登陆成功');
                    this.$router.push('/admin');
                  }else if(res.data === '密码错误'){
                    alert('密码错误')
                  }else{
                    alert('用户名不存在')
                  }

              }).catch(err=>{
                console.log(err);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      testUser(){
       this.ruleForm.pass = 'root';
       this.ruleForm.user = 'root';
      }
    }
  }
</script>
<style scoped>
.col{
    width:80%;
    margin: auto;
}
.loginBar{
  text-align: left;
}
.loginBar span,a{
  cursor: pointer;
  color:blue;
}
</style>
