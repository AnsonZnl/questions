<template>
    <div>
        <h2>详情</h2>
                <el-row type="flex" justify="center">
          <el-col :lg="12" :md="16" :sm="22" :xs="22">
            <div class="col">
            <el-form
            v-if=data
            ref="form" 
            :model="data" 
            label-width="80px" 
            label-position="top"
            :disabled=fromDisabled
            >
                <el-form-item label="您的姓名/昵称">
                    <el-input v-model="data.name"></el-input>
                </el-form-item>
                <el-form-item label="您的年龄">
                    <el-input type="number" v-model="data.age"></el-input>
                </el-form-item>
                <el-form-item label="所在城市">
                    <el-input v-model="data.city"></el-input>
                </el-form-item>
                <el-form-item label="1.别人对你一笑，你有时会怀疑他别有用心；">
                  <el-radio-group v-model="data.optionAnswer.option1">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                
                <el-form-item label="2.阳光明媚的清晨，你却觉得今天一定会倒霉；">
                  <el-radio-group v-model="data.optionAnswer.option2">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                
                <el-form-item label="3.坐在办公室里觉得头痛、背也痛，好像刚踢完一场足球；">
                  <el-radio-group v-model="data.optionAnswer.option3">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                
                <el-form-item label="4.晚上从不会通宵打麻将，白天却一样呵欠连天，四肢无力；">
                  <el-radio-group v-model="data.optionAnswer.option4">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                
                <el-form-item label="5.频繁叹气，并非心情不好，而是觉得缺氧、胸闷；">
                  <el-radio-group v-model="data.optionAnswer.option5">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                
                <el-form-item label="6.躺在床上总是睡不着；">
                  <el-radio-group v-model="data.optionAnswer.option6">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <el-divider></el-divider>
                <el-form-item label="7.好不容易睡着了又被吓醒：该死的，又做噩梦！">
                  <el-radio-group v-model="data.optionAnswer.option7">
                    <el-radio label="A、很少有"></el-radio>
                    <el-radio label="B、有时会"></el-radio>
                    <el-radio label="C、经常有"></el-radio>
                    <el-radio label="D、绝大多数时间是"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item>
                </el-form-item>
            </el-form>
            <el-form ref="form" >
              <el-button type="primary" @click="edit">{{ editText }}</el-button>
              <el-button>返回</el-button>
            </el-form>
            </div>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            editText: "编辑",
            id:'',
            fromDisabled: true,
            data: this.$route.params.data
        }
    },
    created() {
        // console.log("传的"+this.$route.params.id);
        this.id = this.$route.params.id
        axios.get(this.globalFunction.ip+'/show/'+this.id,{}).then(res=>{
          if(res.status === 200){
           console.log(res.data)
           this.data = res.data
          }
        }).catch(err=>{
          console.log(err);
        })
    },
    methods: {
        edit(){
            this.fromDisabled = false;
            this.editText === "编辑" ? '提交' : "编辑";
            console.log(this.id, this.data)
            if(!this.fromDisabled){
              axios.get(this.globalFunction.ip+'/updata',{
                params: {
                  id: this.id,
                  data: this.data
                }
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
    },
}
</script>
<style  scoped>
.col{
  text-align: left;
  border: 1px #DCDFE6 solid;
  padding: 24px;
  border-radius: 5px;
}
.el-radio {
    padding: 10px;
}
.el-form-item__label {
    line-height: 22px;
}
</style>

