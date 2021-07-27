<template>
  <div class="row text-start">
    <div
      v-for="club in clubs"
      :key="club.id"
      class="col-md-6"
    >
      <router-link :to="{name:'ClubShow', params:{id: club.id} }">
        <h5>{{ club.name }}</h5>
      </router-link>
      <div v-if="club.city">({{ club.city }})</div>
      <div class="ps-4 mb-3">
        Structure:
        <div
          v-for="structure in structures"
          :key="structure.id"
          class="ps-3"
        >
          <span v-if="club.structures.map(elem => elem.id).includes(structure.id)" class="text-success">&#9679;</span>
          <span v-else>&#9675;</span>
          {{ structure.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ClubList',
  data() {
    return {
      clubs: []
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios.get('/clubs').then(({ data }) => {
        console.log(data);
        this.clubs = data.clubs;
        this.structures = data.structures;
      })
    }
  }
}
</script>

<style>
</style>