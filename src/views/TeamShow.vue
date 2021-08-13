<template>
  <app-layout>
    <template
      v-if="loaded"
      v-slot:content
    >
    </template>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      team: null,
      players: [],
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const id = this.$route.params.id;
      axios.get(`/clubs/teams/${id}/show`)
        .then(({ data }) => {
          console.log('team data', data);
          this.team = data.team;
          this.players = data.players;
        })
    },
  }
}
</script>

<style>
</style>