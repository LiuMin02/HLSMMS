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
              <h2>添加分类</h2>
            </div>
            <div class="text item">
              <TabControlClass></TabControlClass>
             <!-- 菜单栏下面内容 -->
              <el-form :model="classList" :rules="rules" ref="classList" label-width="100px" class="demo-ruleForm">
                <el-form-item label="所属分类">
                  <el-select v-model="classList.classify" placeholder="---顶级分类---">
                    <el-option label="顶级分类" value="one"></el-option>
                    <el-option label="二级分类" value="tow"></el-option>
                    <el-option label="三级分类" value="three"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="分类名称" prop="classifyName">
                  <el-input v-model="classList.classifyName"></el-input>
                </el-form-item>
                <el-form-item label="用户状态">
                  <el-radio v-model="classList.states" label="1">启用</el-radio>
                  <el-radio v-model="classList.states" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">添加</el-button>
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
import TabControlClass from '../components/TabControlClass'
export default {
   data() {
      return {
        classList:{
          classify:'',
          classifyName:'',
          states:'2'
        },
        rules:{
          classifyName:[{required:true,message:'请输入分类名称',triger:'blur'}]
        }
      };
    },

    methods: {
      onSubmit(){
        console.log(1);
      }
    },
  components:{
    AsideMenu,
    SectionHeader,
    SectionFooter,
    TabControlClass
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
.hengtiao{
  height: 2px;
  border: 1px solid #ccc;
  background-color: #e7e7e7;
}
</style>


