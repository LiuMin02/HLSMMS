<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/class/add"><router-link to="/class/add">添加分类</router-link></el-menu-item>
        <el-menu-item index="/class"><router-link to="/class">分类管理</router-link></el-menu-item>
    </el-menu>
</template>