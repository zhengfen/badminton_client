<template>
  <div class="screen-container container-fluid">
    <div class="center-container">
      <div class="card col-md-6">
        <div class="card-body">
          <login-form @success="login_success" />
          <!--router-link :to="{ name: 'ForgotPassword'}">
                  Forgot Your Password?') }}
                </router-link -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    login_success() {
      console.log('login success');
      this.$router.push({ name: 'Home' });  //  can only push to routes without beforeEnter
      // window.location.replace("/home"); 
    },
  }
}
</script>