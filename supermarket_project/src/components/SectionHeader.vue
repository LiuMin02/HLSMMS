<template>
  <!-- Header -->
    <el-header height="100px">
      <h1>欢迎你 <span v-text="username"></span></h1>
      <p>查看详细的系统信息。</p>
    </el-header>
</template>

<script>
export default {
  data(){
    return {
      username:''
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
