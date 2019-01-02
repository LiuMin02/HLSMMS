<template>
   <div id="login">
     <div> 
     </div>
     <el-card class="box-card login-in">
            <div slot="header" class="clearfix">
                <span>用户登录</span>
            </div>
            <!-- 表单 -->
            <el-form :model="userinfo" status-icon :rules="rules2" ref="userinfo" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model.number="userinfo.username" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="userinfo.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userinfo')">登录</el-button>
                    <el-button @click="resetForm('userinfo')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
   </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      userinfo: {
        pass: "",
        username: ""
      },
      rules2: {
        pass: [
          // { validator: validatePass, trigger: 'blur',},
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "请输入6-14位密码长度的字符",
            trigger: "blur"
          }
        ],
        username: [
          // { validator: checkUsername, trigger: 'blur' },
          { required: true, message: "账号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交表单的方法
    submitForm(formName) {
      //  调用组件的验证方法 提交时验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 允许发送cookie的证书
          this.axios.defaults.withCredentials =true;
          this.axios.post("http://localhost:9090/login",this.qs.stringify(this.userinfo))
          .then(success => {
            if(success.data.code){
              this.$message({
                        message: "欢迎你登录成功！",
                        type: 'success'
                    });
              // vue里面的路由跳转
              this.$router.push("/");
            }else{
              this.$message.error(success.data.mes);
            }
          
          })
          .catch(err => {
            throw err;
          });
        } else {
          console.log("验证失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
#login {
  height: 100%;
  background: url('../assets/imgs/bg.jpg');
  background-size: 100% 100%;
}
.login-in {
  width: 500px;
  height: 300px;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index:99;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.el-card__header span{
  padding-left: 20px;
}
</style>
