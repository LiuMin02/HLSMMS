<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/pro/add"><router-link to="/pro/add">添加商品</router-link></el-menu-item>
        <el-menu-item index="/pro"><router-link to="/pro">商品管理</router-link></el-menu-item>
    </el-menu>
</template>