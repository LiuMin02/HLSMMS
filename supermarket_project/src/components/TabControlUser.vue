<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/user/pwdedit"><router-link to="/user/pwdedit">密码修改</router-link></el-menu-item>
        <el-menu-item index="/user/add"><router-link to="/user/add">添加账号</router-link></el-menu-item>
        <el-menu-item index="/user"><router-link to="/user">账号管理</router-link></el-menu-item>
        
        
    </el-menu>
</template>
<script>
export default {
    
}
</script>
<style>

</style>


