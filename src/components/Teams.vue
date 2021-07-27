<template>
  <table>
    <thead>
      <th>Name</th>
      <th>Club</th>
      <th>Players</th>
    </thead>
    <tbody>
      <tr
        v-for="team in teams"
        :key="team.id"
      >

        <td>{{ team.name }}</td>
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  name: 'Teams',
  data() {
    return {
      teams: []
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios.get('/api/teams').then(({ data }) => {
        console.log(data);
        this.teams = data;
      })
    }
  }
}
</script>

<style>
</style>