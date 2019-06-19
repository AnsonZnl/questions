<template>
  <div>
   <h1>{{this.msg}}</h1>
   <div class="col">
<el-table
      :data="answerData"
      style="width: 100%;height: 600px;">
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
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
   </div>
  </div>
</template>
<script>
// limit查询条数 page第几页
import axios from "axios"
export default {
  name: 'admin',
  data () {
    return {
      total: 0,
      msg: '',
      answerData: []
    }
  },
  created() {
    axios.get(this.globalFunction.ip+'/get_article_list')
    .then(res=>{
      this.answerData= res.data.data;
      this.total = res.data.total;
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
  },
  methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        axios.get(this.globalFunction.ip+'/get_article_list',{
          params:{page: (val-1)*10}
        })
        .then(res=>{
          this.answerData= res.data.data;
        }).catch(err=>{
          console.log(err);
        })
      },
      handleShow(index, row){
        console.log(index,row.id);
         this.$router.push({name: 'Show',params:{id: row.id}})
      },
      handleDelete(index, row) {
        this.total = this.total-1;
        axios.get(this.globalFunction.ip+'/delete',{
          params:{id: row.id}
        }).then(res=>{
          if(res.status === 200){
            this.answerData.splice(index,1);
                axios.get(this.globalFunction.ip+'/get_article_list')
                .then(res=>{
                  this.answerData= res.data.data;
                  this.total = res.data.total;
                  console.log(res)
                }).catch(err=>{
                  console.log(err);
                })
          }
        }).catch(err=>{
            console.log(err);
        })
      }
  },
  computed: {
    // total: function(){
    //   return this.answerData.length
    // }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
.col{
  width: 880px;
  margin: auto;
  text-align: left;
  border: 1px #DCDFE6 solid;
  padding: 24px;
  border-radius: 5px;
}
.pages{
  margin-top: 20px;
  text-align: center;
}
</style>
