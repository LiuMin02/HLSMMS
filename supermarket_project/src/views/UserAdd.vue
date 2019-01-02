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
              <h2>添加管理账号</h2>
            </div>
            <!-- 选项卡公共组件 -->
            <TabControlUser></TabControlUser>
            <!-- 内容 -->
            <div class="text item">
               <el-form :model="userInfo1" status-icon :rules="rules2" ref="userInfo1" label-width="400px" class="demo-ruleForm" label-position="top">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model.number="userInfo1.username" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="userInfo1.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="userInfo1.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择用户组" prop="usergroup">
                  <el-select v-model="userInfo1.usergroup" placeholder="请选择用户分组">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userInfo1')">添加</el-button>
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
  data() {
    // 自定义验证规则
      var validatePass2 = (rule, value, callback) => {
       if (value !== this.userInfo1.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      userInfo1: {
        pass: "",
        username: "",
        checkPass:"",
        usergroup: '',
      },
      rules2: {
        pass: [
          // { validator: validatePass, trigger: 'blur',},
          { required: true, message: "密码不能为空", trigger: "blur" },
          {min: 6,max: 14,message: "请输入6-14位密码长度的字符",trigger: "blur"}
        ],
        username: [
          // { validator: checkUsername, trigger: 'blur' },
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true, message: "确认密码不能为空", trigger: "blur" }
        ],
        usergroup: [
            { required: true, message: '请选择用户分组', trigger: 'change' }
          ],
      }
    };
  },
  methods: {
    // 提交表单的方法
    submitForm(formName) {
      //  调用组件的验证方法 提交时验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post('http://localhost:9090/user/add',this.qs.stringify(this.userInfo1))
          .then(success => {
            if(success.data.code){
              // 使用element组件消息提示
              this.$message({
                message: success.data.mes,
                type: 'success'
              });
              // vue里面的路由跳转
              this.$router.push("/user");
            }else{
              this.$message.error(success.data.mes);
            }
          })
          .catch(err => {
            throw err;
          })
        } else {
          console.log("验证失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.el-form--label-top{
  width: 30%;
}
</style>


