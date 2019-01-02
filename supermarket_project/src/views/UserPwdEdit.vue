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
              <h2>修改账户密码</h2>
            </div>
            <!-- 选项卡公共组件 -->
            <TabControlUser></TabControlUser>
            <div class="text item">
              <el-form :model="passEdit" status-icon :rules="rules2" ref="passEdit" label-width="400px" class="demo-ruleForm" label-position="top">
                <el-form-item label="原密码" prop="pass">
                    <el-input type="password" v-model="passEdit.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-input type="password" v-model="passEdit.newpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="checkPass">
                  <el-input type="password" v-model="passEdit.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="passChange()">修改</el-button>
                </el-form-item>
              </el-form>
            </div>
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
export default {
  data(){
    var validatePass2 = (rule, value, callback) => {
       if (value !== this.passEdit.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      passEdit:{
        pass: "",
        newpass:"",
        checkPass:""
      },
      rules2:{
        pass: [
          // { validator: validatePass, trigger: 'blur',},
          { required: true, message: "原始密码不能为空", trigger: "blur" },
        ],
        newpass: [
          // { validator: validatePass, trigger: 'blur',},
          { required: true, message: "密码不能为空", trigger: "blur" },
          {min:6,max:12,message: "请输入6-12位密码长度的字符",trigger: "blur"}
        ],
        checkPass:[
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    passChange(){
      this.axios.post("http://localhost:9090/user/pwdedit",this.qs.stringify(this.passEdit))
      .then(success => {
        let result = success.data;
        if(result.code){
          this.$message({
            message: result.mes,
            type: 'success'
          });
          // 发送ajax 清除cookie重新登录
          this.axios.get("http://localhost:9090/loginout")
          .then(successs => {
              let result = successs.data;
              if(result.code){
                  this.$message({
                      message: "请重新登录登录",
                      type: 'success'
                  });
                  this.$router.push("/login");
              }else{
                  this.$message.error("系统错误，请稍后重试！");
              }
          })
          .catch(err => {
              throw err;
          });
        }else{
          this.$message.error(result.mes);
        }
      })
      .catch(err => {
        throw err;
      });
    }
  },
  components:{
    AsideMenu,
    SectionHeader,
    SectionFooter,
    TabControlUser
  }
};
</script>
<style>
/* main */
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
  padding: 0 !important;
  padding-left: 20px;
  line-height: 50px;
}
</style>


