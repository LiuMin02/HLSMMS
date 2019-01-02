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
              <h2>系统配置信息</h2>
            </div>
            <div class="text item">
              
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
  methods: {
    
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


