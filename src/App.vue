<template>
  <div>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      v-if="false"
    >
    <div id="content-wrapper" class="container">
      <router-view />
    </div>
    <div id="footer"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
