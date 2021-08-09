<template>
  <app-layout>
    <template v-slot:content>
      <div class="row text-start">
        <div
          v-for="club in clubs"
          :key="club.id"
          class="col-md-6"
        >
          <router-link :to="{name:'ClubShow', params:{id: club.id} }">
            <h5>{{ club.name }}</h5>
          </router-link>
        </div>
      </div>
    </template>
  </app-layout>
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
      axios.get('/clubs/clubs/all').then(({ data }) => {
        console.log(data);
        this.clubs = data;
      })
    }
  }
}
</script>

<style>
</style>