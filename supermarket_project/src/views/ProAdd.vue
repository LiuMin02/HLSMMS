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
              <h2>商品添加</h2>
            </div>
            <div class="text item">
              <TabControlPro></TabControlPro>
              <el-form :model="proInfo" :rules="rules" ref="proInfo" label-width="110px" class="demo-ruleForm" size="mini">
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
                    <el-button type="primary" @click="createMa">生成条形码</el-button>
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
                  <el-button type="primary" @click="proAdd">添加</el-button>
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
        proInfo:{
          // proPrice: 0,
          proNum: '',
          // proName: '',
          // classify: '',
          // proMarket: 0,
          // proSelfPrice:0,
          // proRepertory: 0,
          // proWeight:0,
          // proKg:'',
          proVip:'1',
          proIsPromo:'0',
          // proDetail:''
        },
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
      };
    },
  methods: {
    proAdd(){
      this.axios.post('http://172.16.4.225:9090/product/add',this.qs.stringify(this.proInfo))
      .then( success => {
        let result = success.data;
        if(result.code){
          this.$message({
            message: result.mes,
            type: 'success'
          });
          this.$router.push("/pro"); 
        }else{
          this.$message.error(result.mes);
        }
      })
      .catch(err =>{
        throw err;
      });
    },
    createMa(){
      this.proInfo.proNum = new Date().getTime();
    }
  },
  components:{
    AsideMenu,
    SectionHeader,
    SectionFooter,
    TabControlPro
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
.demo-ruleForm{
  width: 40%;
}
</style>


