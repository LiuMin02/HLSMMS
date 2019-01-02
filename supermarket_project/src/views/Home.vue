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
              <h2>系统信息</h2>
            </div>
            <div class="text item">
              <p><i class="el-icon-info"></i> 商品总数<span></span>。已销售的总金额：<span></span>。库存商品总价：<span></span></p>
              <p><i class="el-icon-info"></i><a href="#">导入数据</a></p>

              <el-row :gutter="40">
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <h2>销售排行</h2>
                      </div>
                      <div class="text item">
                        <el-table :data="proSall" stripe style="width: 100%">
                          <el-table-column prop="proName" label="商品名称" width="180"></el-table-column>
                          <el-table-column prop="proNum" label="销量"></el-table-column>
                        </el-table>
                      </div>
                    </el-card>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <h2>缺货的商品</h2>
                      </div>
                      <div class="text item">
                        <el-table :data="proOos" style="width: 100%">
                          <el-table-column label="商品名称" width="180">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.proName }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="库存" width="180">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.leftNum }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作">
                            <template slot-scope="scope">
                              <el-button size="mini" type="text"  @click="handleAdd(scope.$index, scope.row)">入库</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
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
  name: "home",
  data() {
    return {
      proSall: [
        {
          proName: "手机",
          proNum: 1000
        },
        {
          proName: "电脑",
          proNum: 10
        },
        {
          proName: "平板",
          proNum: 100
        },
        {
          proName: "手机",
          proNum: 1111
        }
      ],
      proOos: [
        {
          proName: "手机",
          leftNum: 1000
        }
      ]
    };
  },
  methods: {
    handleAdd(index,row){
      console.log(index, row);
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
.item p {
  background: #dbe3ff;
  line-height: 40px;
  border-radius: 6px;
  margin-bottom: 14px;
}
.item p i {
  color: #4063c9;
  margin: 0 10px;
}
.item p a {
  text-decoration: none;
  color: #93d46f;
}
</style>

