<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/pro/stock"><router-link to="/pro/stock">进货统计</router-link></el-menu-item>
        <el-menu-item index="/pro/sale"><router-link to="/pro/sale">销售统计</router-link></el-menu-item>
    </el-menu>
</template>