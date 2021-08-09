<template>
  <form v-on:submit.prevent="login()">
    <div class="py-3">
      <h4 class="text-primary">Connexion</h4>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="message"
      >{{ message }}</div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">@</span>
      </div>
      <input
        type="email"
        class="form-control"
        placeholder="identifiant"
        v-model="email"
      />
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">*</span>
      </div>
      <input
        type="password"
        class="form-control"
        placeholder="mot de passe"
        v-model="password"
      />
    </div>

    <div class="text-right mb-3">
      <button
        type="submit"
        class="btn btn-outline-primary"
      >Me connecter</button>
    </div>
  </form>
</template>

<script>
/**
 * https://stackoverflow.com/questions/28058326/django-rest-framework-obtain-auth-token-using-email-instead-username
 */
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    login(e) {
      this.message = "";
      this.$store
        .dispatch("auth/loginAction", {
          username: this.email,  //sending json and use field "username" but value is email, still work
          password: this.password
        })
        .then((data) => {
          if(data.message) this.message = data.message; 
          else this.$emit("success");
        }, error => {
          console.log(error.response && error.response.data);
          const message = error.response.data && error.response.data.message;
          if (message) this.message = message;  
        })
        ;
    }
  }
};
</script>