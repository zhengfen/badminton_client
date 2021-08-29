<template>
  <div class="admin-wrapper">
    <!-- Sidebar -->
    <nav-admin></nav-admin>
    <!-- Top nav -->
    <div id="content">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <!-- button to toggle sidebar -->
          <i
            class="fas fa-bars"
            id="sidebarCollapse"
            @click="toggleAdminSidebarActive()"
          ></i>

          <locale-selection />
        </div>
      </nav>
      <div
        class="container-fluid"
        style="padding-top:15px;"
      >
         <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods:{
    toggleAdminSidebarActive(){
      this.$store.commit('layout/toggleAdminSidebarMutation'); 
    }
  }

}
</script>

<style>
</style>