<template>
  <nav id="sidebar" :class="{ active: sidebarActive }">
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
    sidebarActive(){
      return this.$store.state.layout.sidebarActive; 
    }
  }
}
</script>

<style>
</style>