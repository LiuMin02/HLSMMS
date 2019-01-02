<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
html,body,#app,#home{
  height: 100%;
  padding: 0;
  margin: 0;
}
.home{min-height: 100%}
</style>
