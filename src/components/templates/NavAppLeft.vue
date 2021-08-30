<template>
  <nav class="sidebar">
    <ul class="list-unstyled">
      <li class="nav-item" v-for="page in pages" :key="page.id">
        <router-link :to="{ name: 'PageShow', params: {slug: slug_trans(page.title)} }" class="nav-link" @click="closeNav">
          {{ trans(page.title) }}
        </router-link>
      </li>

      <template v-if="signedIn">
        <li class="nav-item" v-if="isAdmin">
          <router-link :to="{ name: 'AdminTeams' }" class="nav-link"> Admin </router-link>
        </li>
        <li class="nav-item">
          <logout-button link_class="nav-link" @click="closeNav" />
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link :to="{ name: 'Login' }" class="nav-link" @click="closeNav">
            {{ $t("Login") }}
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>

export default {
  created(){
    this.$store.dispatch('cms/fetchPagesAction'); 
  },
  computed: {
    pages(){
      return this.$store.state.cms.pages; 
    }
  },
  methods: {
    closeNav() {
      this.$store.commit("layout/closeNav");
    },
  },
};
</script>

<style></style>
