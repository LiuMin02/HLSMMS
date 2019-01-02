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
              <h2>商品管理</h2>
            </div>
            <div class="text item">
              <TabControlPro></TabControlPro>
              <!-- 内容 -->
              <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item>
                  <el-select v-model="proSerch.classify" placeholder="-----选择分类-----">
                    <el-option label="日用商品" value="日用商品"></el-option>
                    <el-option label="零食" value="零食"></el-option>
                    <el-option label="烟酒" value="烟酒"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="关键词:">
                  <el-input v-model="proSerch.keyWords"></el-input>
                </el-form-item>
                <el-form-item label="（商品名称，条形码）"></el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSerch">查询</el-button>
                </el-form-item>
              </el-form>
              <div class="hengtiao"></div>
              <!-- 表格内容 -->
              <el-table :data="proList" stripe style="width: 100%">
                <el-table-column prop="proNum" label="商品条形码" width="130"></el-table-column>
                <el-table-column prop="proName" label="商品名称" width="90"></el-table-column>
                <el-table-column prop="classify" label="所属分类" width="90"></el-table-column>
                <el-table-column prop="proPrice" label="售价（元）" width="100"></el-table-column>
                <el-table-column prop="proPromotion" label="促销价（元）" width="110"></el-table-column>
                <el-table-column prop="proMarket" label="市场价（元）" width="110"></el-table-column>
                <el-table-column prop="proRepertory" label="库存" width="60"></el-table-column>
                <el-table-column prop="repertoryPrice" label="库存总额（元）" width="130"></el-table-column>
                <el-table-column prop="salePrice" label="销售总额（元）" width="130"></el-table-column>
                <el-table-column label="管理">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="proEdit(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                      <el-form :model="proInfo" :rules="rules" ref="proInfo" label-width="110px" class="proMontana" size="mini">
                        <el-form-item label="商品分类" prop="classify">
                          <el-select v-model="proInfo.classify" placeholder="---请选择商品分类---">
                            <el-option label="日用商品" value="日用商品"></el-option>
                            <el-option label="零食" value="零食"></el-option>
                            <el-option label="烟酒" value="烟酒"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="商品条形码" prop="proNum">
                          <el-col :span="14">
                            <el-input v-model="proInfo.proNum" ></el-input>
                          </el-col>
                          <el-col class="line" :span="2">&nbsp;</el-col>
                          <el-col :span="6">
                            <el-button type="primary">生成条形码</el-button>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="商品名称" prop="proName">
                          <el-input v-model="proInfo.proName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品售价(元)" prop="proPrice">
                          <el-input v-model="proInfo.proPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价（元）" prop="proMarket">
                          <el-input v-model="proInfo.proMarket"></el-input>
                        </el-form-item>
                        <el-form-item label="商品进价（元）" prop="proSelfPrice">
                          <el-input v-model="proInfo.proSelfPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="入库数量（件）" prop="proRepertory">
                          <el-input v-model="proInfo.proRepertory"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量（g）" prop="proWeight">
                          <el-input v-model="proInfo.proWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品单位" prop="proKg">
                          <el-input v-model="proInfo.proKg"></el-input>
                        </el-form-item>
                        <el-form-item label="会员优惠" prop="proVip">
                          <el-radio v-model="proInfo.proVip" label="1">享受</el-radio>
                          <el-radio v-model="proInfo.proVip" label="0">不享受</el-radio>
                        </el-form-item>
                        <el-form-item label="是否促销" prop="proIsPromo">
                          <el-radio v-model="proInfo.proIsPromo" label="1">启用</el-radio>
                          <el-radio v-model="proInfo.proIsPromo" label="0">禁用</el-radio>
                        </el-form-item>
                        <el-form-item label="商品简介">
                          <el-input type="textarea" v-model="proInfo.proDetail"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" @click="proUpdate">修改</el-button>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
              <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="total" @current-change="currentChange"
              prev-text="上一页" next-text="下一页" :current-page.sync="currentPage"></el-pagination>
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
import TabControlPro from '../components/TabControlPro'
export default {
  data() {
    let isNum = function(rule, value, callback){
          if (isNaN(value)) {
            callback(new Error('请输入数字值'));
          }  else {
            callback();
          }
        };
    return {
      proList:[],
      proInfo:{},
      proSerch:{
        classify:'',
        keyWords:''
      },
      dialogFormVisible:false,
      pageSize:5,
      currentPage:1,
      total:13,
      rules: {
        classify: [
          { required: true, message: '请选择商品分类', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        proNum: [
          { required: true, message: '请生成商品条形码', trigger: 'blur' },
          { min: 10, max: 18, message: '长度在 10 到 18 个字符', trigger: 'blur' }
        ],
        proName: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        proPrice: [
          { required: true, message: '请填写商品价格', trigger: 'blur' },
          { validator: isNum, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 当前页改变
    currentChange(){
        this.sendAjax();
    },
    onSerch() {
      this.sendAjax();
    },
    proEdit(thisRow){
      this.dialogFormVisible = true;
      this.proInfo = thisRow;
    },
    sendAjax(){
      this.axios.get('http://localhost:9090/product?classify='+this.proSerch.classify+'&keyWords='+this.proSerch.keyWords+'&currPage='+this.currentPage+'&pageSize='+this.pageSize)
      .then(success => {
        let result = success.data.product;
        this.proList = result;
        this.total = success.data.total;
        // 遍历看是否促销
        this.proList.forEach(element => {
          if(element.proIsPromo==='1'){
            let  proPromo= element.proPrice*0.9;
            element.proPromotion = proPromo.toFixed(2);
          }else{
            element.proPromotion = "未促销"
          }
          let allpertoryPrice =element.proPrice*element.proRepertory;
          element.repertoryPrice =allpertoryPrice.toFixed(2);
          let allsalePrice = element.proPrice*element.proSalled;
          element.salePrice =allsalePrice.toFixed(2);
        });
      })
      .catch(err => {
        throw err;
      });
    },
    proUpdate(){
      this.axios.post("http://localhost:9090/product/save",this.qs.stringify(this.proInfo))
      .then( success => {
        let result = success.data;
        if(result.code){
          this.$message({
            message: result.mes,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.sendAjax();
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
    TabControlPro
  },
  created(){
    this.sendAjax();
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
.proMontana{
  width: 60%;
}
</style>


