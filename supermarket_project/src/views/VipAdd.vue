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
              <h2>添加编辑账号</h2>
            </div>
            <div class="text item">
              <TabControlVip></TabControlVip>
              <!-- 内容 -->
              <el-form ref="vipList" :model="vipList" label-width="95px" size="mini" label-position="left" :rules="rules" class="demo-ruleForm">
                <el-form-item label="真实名字"  prop="vipName">
                  <el-input v-model="vipList.vipName"></el-input>
                </el-form-item>
                <el-form-item label="会员卡卡号" prop="vipNum">
                  <el-input v-model="vipList.vipNum"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="vipGroup">
                  <el-select v-model="vipList.vipGroup" placeholder="请选择用户分组">
                    <el-option label="超级会员" value="superVip"></el-option>
                    <el-option label="普通会员" value="normolVip"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="vipIdCrad">
                  <el-input v-model="vipList.vipIdCrad"></el-input>
                </el-form-item>
                <el-form-item label="用户状态" prop="states">
                  <el-radio v-model="vipList.states" label="1">启用</el-radio>
                  <el-radio v-model="vipList.states" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="手机号码" prop="vipPhone">
                  <el-input v-model="vipList.vipPhone"></el-input>
                </el-form-item>
                <el-form-item label="座机号码" prop="vipTel">
                  <el-input v-model="vipList.vipTel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="vipEmail">
                  <el-input v-model="vipList.vipEmail"></el-input>
                </el-form-item>
                <el-form-item label="地区选择">
                <el-cascader placeholder="请选择省/市" :options="vipList.vipLocation" @active-item-change="handleItemChange" :props="props"></el-cascader>
                  <!-- <el-col :span="11"> -->
                    <!-- <el-select v-model="vipList.vipLocation.label" placeholder="---请选择省份---">
                      <el-option label="超级会员" value="superVip"></el-option>
                      <el-option label="普通会员" value="normolVip"></el-option>
                    </el-select> -->
                  <!-- </el-col>
                  <el-col class="line" :span="2">---</el-col>
                  <el-col :span="11"> -->
                    <!-- <el-cascader :options="vipList.vipLocation" @active-item-change="handleItemChange" :props="props"></el-cascader>                     -->
                    <!-- <el-select v-model="vipList.vipLocation.vipCity" placeholder="---请选择城市---">
                      <el-option label="超级会员" value="superVip"></el-option>
                      <el-option label="普通会员" value="normolVip"></el-option>
                    </el-select> -->
                  <!-- </el-col> -->
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="vipList.vipAddrs"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="vipPostcode">
                  <el-input v-model="vipList.vipPostcode"></el-input>
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
import TabControlVip from '../components/TabControlVip'


export default {
  data() {
      var checkNum=(rule, value, callback)=>{
        if (isNaN(Number(value))) {
            callback(new Error('请输入数字类型'));
          } 
        };
      return {
        // 信息
        vipList: {
          vipName: '',
          vipNum:'',
          vipGroup: '',
          vipIdCrad: '',
          vipPhone: '',
          states: '1',
          vipTel:'',
          vipEmail:'',
          vipAddrs: '',
          vipPostcode: '',
          vipLocation:[{
            label:'江苏',
            vipCity:[]
          },{
            label:'浙江',
            vipCity:[]
          },{
            label:'四川',
            vipCity:[]
          }]
        },
        props: {
          value: 'label',
          children: 'vipCity'
        },
        // 验证规则
        rules:{
          vipName:[
            { required: true, message: '请输入客户真实姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
          vipNum:[
            { required: true, message: '请输入客户真实姓名', trigger: 'blur' },
            { min: 11, max: 11, message: '长度应为11个字符', trigger: 'blur' }
          ],
          vipGroup:[{ required: true, message: '请输入客户真实姓名', trigger: 'blur' }],
          vipIdCrad:[
            { min: 18, max: 18, message: '长度应为18个字符', trigger: 'blur' },
            { validator: checkNum, trigger:  ['blur', 'change'] }],
          vipPhone:[
            { min: 11, max: 11, message: '长度应为11个字符', trigger: 'blur' },
            { validator: checkNum, trigger: ['blur', 'change'] }
          ],
          vipTel:[
            { min: 7, max: 7, message: '长度应为7个字符', trigger: 'blur' },
            { validator: checkNum, trigger:  ['blur', 'change'] }
          ],
          vipEmail:[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          vipPostcode:[
            { min: 6, max: 6, message: '长度应为6个字符', trigger: 'blur' },
            { validator: checkNum, trigger:  ['blur', 'change'] }
          ]
        }
      }
    },
  methods: {
    // 城市选择
    handleItemChange(val) {
          if (val.indexOf('江苏') > -1 && !this.vipList.vipLocation[0].vipCity.length) {
            this.vipList.vipLocation[0].vipCity = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.vipList.vipLocation[1].vipCity.length) {
            this.vipList.vipLocation[1].vipCity = [{
              label: '杭州'
            },{
              label: '宁波'
            }];
          }else if (val.indexOf('四川') > -1 && !this.vipList.vipLocation[2].vipCity.length) {
            this.vipList.vipLocation[2].vipCity = [{
              label: '成都'
            },{
              label: '巴中'
            }];
          }
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
.el-form--label-left{
  width: 40%
}
</style>


