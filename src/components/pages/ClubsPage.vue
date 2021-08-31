<template>
  <div class="row text-start">
    <div v-for="club in clubs" :key="club.id" class="col-md-6">
      <router-link :to="{ name: 'ClubShow', params: { slug: club.slug } }">
        <h5>{{ club.name }}</h5>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClubList",
  data() {
    return {      
    };
  },
  computed:{
    clubs(){
      return this.$store.state.clubs.clubs; 
    }
  },
  created() {
    this.$store.dispatch('clubs/fetchClubsAction'); 
  },
  methods: {
  },
};
</script>

<style></style>
