<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/vip/add"><router-link to="/vip/add">添加账号</router-link></el-menu-item>
        <el-menu-item index="/vip"><router-link to="/vip">账号管理</router-link></el-menu-item>
    </el-menu>
</template>