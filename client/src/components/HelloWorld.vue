<template>
  <div>
   <h1>{{this.msg}}</h1>
<el-table
      :data="answerData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="地址">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleShow(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      answerData: null
    }
  },
  created() {
    axios.get('http://localhost:3000/get_article_list')
    .then(res=>{
      this.answerData= res.data;
      console.log(res.data)
    }).catch(err=>{
      console.log(err);
    })
  },
  methods:{
      handleShow(index, row){
        console.log(index,row.id);
         this.$router.push({name: 'Show',params:{id: row.id}})
      },
      handleEdit(index, row) {
          console.log(index, row);
        },
      handleDelete(index, row) {
        // console.log(row.id);
        axios.get('http://localhost:3000/delete',{
          params:{id: row.id}
        }).then(res=>{
          if(res.status === 200){
            this.answerData.splice(index,1)
          }
        }).catch(err=>{
            console.log(err);
        })
      }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
