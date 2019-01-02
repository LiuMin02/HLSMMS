<template>
  <div id="home">
    <el-container class="contain home">
      <AsideMenu></AsideMenu>
      <el-container class="content">
        <SectionHeader></SectionHeader>
        <!-- Main -->
        <el-main>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h2>账户管理</h2>
            </div>
            <!-- 选项卡公共组件 -->
            <TabControlUser></TabControlUser>
             <el-table :data="userList" style="width: 100%">
              <el-table-column label="用户名称"  width="300">
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column  label="用户组"  width="300">
                <template slot-scope="scope">
                  <span>{{ scope.row.usergroup }}</span>
                </template>
              </el-table-column>
              <el-table-column  label="添加时间"  width="300">
                <template slot-scope="scope">
                  <span>{{ scope.row.userstartDate|turnDate }}</span>
                </template>
              </el-table-column>
              
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
                    <i class="el-icon-edit"></i>编辑
                  </el-button>
                  <!-- 编辑用户页面 -->
                  <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
                    <el-form :model="userinfo">
                      <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="userinfo.username" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" :label-width="formLabelWidth">
                          <el-input type="password" v-model="userinfo.userpass" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="用户分组" :label-width="formLabelWidth">
                        <el-select v-model="userinfo.usergroup">
                          <el-option label="超级管理员" value="超级管理员"></el-option>
                          <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="editOk">确 定</el-button>
                    </div>
                  </el-dialog>
                  <el-button size="mini" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete"></i>删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-main>
        <!-- Footer -->
        <SectionFooter></SectionFooter>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import AsideMenu from '../components/AsideMenu'
import SectionHeader from '../components/SectionHeader'
import SectionFooter from '../components/SectionFooter'
import TabControlUser from '../components/TabControlUser'
import moment from 'moment'
export default {
  data() {
      return {
        userList: [],
        userinfo:{},
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
  methods:{
    // 用户编辑成功
    editOk(){
      this.axios.post('http://localhost:9090/user/usersave',this.qs.stringify(this.userinfo))
      .then(success => {
        let result = success.data
        if(result.code){
          this.$message({
            message: result.mes,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.ajaxToUserList();             
        } else{
          this.$message.error(result.mes);
        }
      })
      .catch(err =>{
        throw err;
      })
      
    },
    handleEdit(userid) {
      this.axios.get('http://localhost:9090/user/useredit?userid='+userid)
      .then(success => {
        this.dialogFormVisible = true;        
        let oldUserData = success.data[0];
        this.userinfo = oldUserData;
      })
      .catch(err => {
        throw err;
      })
    },
    // ajax请求数据
    ajaxToUserList(){
      this.axios.get("http://localhost:9090/user")
      .then(success => {
        this.userList=success.data;
      })
      .catch(err => {
        throw err;
      })
    },
    // 删除用户数据
    handleDelete(userid) {
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get('http://localhost:9090/user/userdelete?userid='+userid)
          .then(success => {
            let result = success.data;
            if(result.code){
              this.$message({
                message: result.mes,
                type: 'success'
              });     
              this.ajaxToUserList(); 
            }else{
              this.$message.error(result.mes);
            }
            // this.$router.push('/user');  
          })
          .catch(err => {
            throw err;
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  components:{
    AsideMenu,
    SectionHeader,
    SectionFooter,
    TabControlUser
  },
  // 钩子函数
  created(){
    this.ajaxToUserList();
  },
  // 过滤器
  filters:{
    turnDate(oldDate){
      return moment(oldDate).format("YYYY-MM-DD");
    }
  }
};
</script>
<style>
/* main */
.el-main {
    background-color: #f9f9f9;
    color: #333;
    padding-top: 0 !important;
  }
  .el-main .box-card {
    border-radius: 10px;
    width: auto;
    border: 1px solid #ccc;
    background: #fff;
  }
  .box-card h2 {
    line-height: 50px;
    font-size: 18px;
    padding-left: 20px;
    background: linear-gradient(#eee, #e5e5e5);
  }
  .el-card__header {
    padding: 0;
    padding-left: 20px;
    line-height: 50px;
  }
  .el-button--mini{
    padding: 7px !important;
    margin-right: 5px !important;
  }
</style>


