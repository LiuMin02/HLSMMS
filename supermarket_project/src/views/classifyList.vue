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
              <h2>分类管理</h2>
            </div>
            <div class="text item">
             <TabControlClass></TabControlClass>
             <!-- 内容 -->
             <el-table :data="classList" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
              <el-table-column prop="classify" label="所属分类" width="180"> </el-table-column>
              <el-table-column  prop="classifyName" label="商品名称"> </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
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
          classList: [{
            classify:'日用品',
            classifyName: '|_舒肤佳A',
          }, {
            classify:'日用品',
            classifyName: '|_舒肤佳B',
          }, {
            classify:'零食',
            classifyName: '|_老坛酸菜',
          }, {
            classify:'零食',
            classifyName: '|_优乐美',
          }, {
            classify:'烟酒',
            classifyName: '|_龙凤呈祥',
          },{
            classify:'烟酒',
            classifyName: '|_茅台',
          }]
        }
      },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(arguments);
      
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
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
.demo-ruleForm{
  width: 40%;
}
</style>


