<template>
    <div>
        <div class="col">
            <h2>用户注册</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="用户名" prop="user">
                    <el-input v-model.number="ruleForm.user"></el-input>
                </el-form-item> 
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validataEmail = (rule,value,callback) =>{
          // if(value === ''){
          //     callback(new Error('请输入Email'))
          // }else if(rule){
          //     callback(new Error('请输入正确的Email'));
          //     console.log(rule)
          // }else{
          //     callback()
          // }
          callback()
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          user: '',
          email: ''
        },
        rules: {
         email: [
            { validator: validataEmail, trigger: ['blur','change'], type: 'email' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
            // alert('submit!');
            let data = this.ruleForm;
            console.log(data);
              axios.post(this.globalFunction.ip+'/reg', data)
              .then(res=>{
                  console.log(res)
                  if(res.status === 200){
                    alert('注册成功')
                  }
              }).catch(err=>{
                  console.log(err)
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
.col{
    width:80%;
    margin: auto;
}
</style>
