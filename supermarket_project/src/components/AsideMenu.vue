<template>
    <el-aside width="230px">
        <div class="tit">
            <h1>华联超市管理系统</h1>
            <p>您好,<span v-text="username"></span></p>
            <p><router-link to="/">管理首页</router-link><span> | </span><a href="javascript:void(0)" @click="loginOut">退出系统</a></p>
        </div>
        <!-- 左侧菜单 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color='transparent'
            text-color="#fff" active-text-color="#ffd04b" :unique-opened="true">
            <el-submenu index="1">
                <template slot="title">
                <span>分类管理</span>
                </template>
                <el-menu-item index="/class"><router-link to="/class">分类管理</router-link></el-menu-item>
                <el-menu-item index="/class/add"><router-link to="/class/add">添加分类</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <span>商品管理</span>
                </template>
                <el-menu-item index="/pro"><router-link to="/pro">商品管理</router-link></el-menu-item>
                <el-menu-item index="/pro/add"><router-link to="/pro/add">添加商品</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <span>进货管理</span>
                </template>
                <el-menu-item index="3-1">库存管理</el-menu-item>
                <el-menu-item index="3-2">添加库存</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                <span>出货管理</span>
                </template>
                <el-menu-item index="4-1">销售列表</el-menu-item>
                <el-menu-item index="4-2">商品出库</el-menu-item>
                <el-menu-item index="4-3">商品退货</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                <span>统计管理</span>
                </template>
                <el-menu-item index="/pro/sale"><router-link to="/pro/sale">销售统计</router-link></el-menu-item>
                <el-menu-item index="/pro/stock"><router-link to="/pro/stock">进货统计</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                <span>账号管理</span>
                </template>
                <el-menu-item index="/user"><router-link to="/user">账号管理</router-link></el-menu-item>
                <el-menu-item index="/user/add"><router-link to="/user/add">添加账号</router-link></el-menu-item>
                <el-menu-item index="/user/pwdedit"><router-link to="/user/pwdedit">密码修改</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title">
                <span>会员管理</span>
                </template>
                <el-menu-item index="/vip"><router-link to="/vip">账号管理</router-link></el-menu-item>
                <el-menu-item index="/vip/add"><router-link to="/vip/add">添加账号</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">
                <span>系统管理</span>
                </template>
                <el-menu-item index="/"><router-link to="/">系统信息</router-link></el-menu-item>
                <el-menu-item index="/config"><router-link to="/config">系统配置</router-link></el-menu-item>
                <el-menu-item index="/limit"><router-link to="/limit">权限管理</router-link></el-menu-item>
                <el-menu-item index="/manage"><router-link to="/manage">添加管理组</router-link></el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>   
</template>

<script>
export default {
    data(){
        return{
            username:""
        }
    },
    methods:{
        // 退出登录
        loginOut(){
            this.axios.get("http://172.16.4.225:9090/loginout")
            .then(successs => {
                let result = successs.data;
                if(result.code){
                    this.$message({
                        message: "退出成功！欢迎下次登录",
                        type: 'success'
                    });
                    this.$router.push("/login");
                }else{
                    this.$message.error("系统错误，请稍后重试！");
                }
            })
            .catch(err => {
                throw err;
            });
        }
    },
    created(){
        this.axios.get('http://172.16.4.225:9090/getcookie')
        .then(successs => {
            let result = successs.data;
            if(result.code){
                this.username = result.username;
            }
        })
        .catch(err => {
            throw err;
        })
    }
}
</script>

<style>
</style>
