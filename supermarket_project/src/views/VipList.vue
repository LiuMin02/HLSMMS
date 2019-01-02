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
              <h2>会员管理</h2>
            </div>
            <div class="text item">
              <TabControlVip></TabControlVip>
              <!-- 搜索表单 -->
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="搜索">
                  <el-input placeholder="会员卡/会员名/手机"></el-input>
                </el-form-item>
                 <el-form-item label="会员卡，会员名，电话，手机"></el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-form>
              <!-- 横条 -->
              <div class="hengtiao"></div>
              <!-- 表格数据 -->
              <el-table :data="vipList" stripe style="width: 100%">
                <el-table-column prop="vipNum" label="会员卡卡号" width="130"></el-table-column>
                <el-table-column prop="vipName" label="会员姓名" width="130"></el-table-column>
                <el-table-column prop="vipGrade" label="会员等级" width="130"></el-table-column>
                <el-table-column prop="vipScore" label="会员积分" width="100"></el-table-column>
                <el-table-column prop="vipDiscount" label="折扣" width="130"></el-table-column>
                <el-table-column prop="vipPhone" label="手机号" width="150"></el-table-column>
                <el-table-column prop="vipTel" label="座机号" width="150"></el-table-column>
                <el-table-column label="管理">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
              <el-pagination :page-size="1" :pager-count="5" layout="prev, pager, next" :total="2" prev-text="上一页" next-text="下一页"></el-pagination>
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
import TabControlVip from '../components/TabControlVip'
export default {
  data() {
      return {
        vipList: [{
          vipNum: '181229001',
          vipName: '张三',
          vipGrade: '铜牌会员',
          vipScore: '218',
          vipDiscount: '50%',
          vipPhone: '15826432156',
          vipTel: '027-5462158',
        },{
          vipNum: '181229002',
          vipName: '李四',
          vipGrade: '铜牌会员',
          vipScore: '50',
          vipDiscount: '50%',
          vipPhone: '13654875926',
          vipTel: '027-4859627',
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleEdit(index,row){
        console.log('submit!');
      }
    },
  components:{
    AsideMenu,
    SectionHeader,
    SectionFooter,
    TabControlVip
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


