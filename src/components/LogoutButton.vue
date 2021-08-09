<template>
  <a
    :class="link_class"
    @click="logout"
  >
    <i class="fas fa-sign-out-alt"></i>
  </a>
</template>

<script>
export default {
  name: "LoginForm",
  props: ['link_class'],
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logoutAction');
      this.$router.push('/');
    }
  }
}
</script>