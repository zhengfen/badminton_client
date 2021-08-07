<template>
  <nav id="sidebar">
    <div class="sidebar-header">
      <a href="/">
        <h3>Badminton Admin</h3>
      </a>
    </div>

    <ul class="list-unstyled components">
      <li>
        <a
          href="/admin/teams"
          :class="{'active': ['/admin/teams'].includes(pathname)}"
        >
          Teams
        </a>
      </li>      
    </ul>
  </nav>
</template>

<script>
export default {
  beforeCreate() {
    if (navigator.onLine) {
      // if (!window.sessionStorage.getItem("settingsUpdated"))
      // this.$store.dispatch("fetchSettings");
    }
  }, 
  computed:{
    pathname(){
      return window.location.pathname; 
    }
  }
}
</script>

<style>
</style>