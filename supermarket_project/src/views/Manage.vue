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
              <h2>添加管理组</h2>
            </div>
            <div class="text item">
              <el-form :model="userInfo1" status-icon :rules="rules2" ref="userInfo1" label-width="400px" class="demo-ruleForm" label-position="top">
                <el-form-item label="管理账号" prop="username">
                    <el-input v-model.number="userInfo1.username" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="userInfo1.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="userInfo1.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择管理组" prop="region">
                  <el-select v-model="userInfo1.region" placeholder="请选择管理组">
                    <el-option label="超级管理员" value="super"></el-option>
                    <el-option label="普通管理员" value="normal"></el-option>
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
        region: '',
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
        region: [
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
          alert("表单验证成功");

          // vue里面的路由跳转
          this.$router.push("/");
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
    SectionFooter
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
  padding: 0 !important;
  padding-left: 20px;
  line-height: 50px;
}
</style>


