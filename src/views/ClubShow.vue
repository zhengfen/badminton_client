<template>
  <app-layout>
    <template
      v-if="loaded"
      v-slot:content
    >
      <h4>{{ club.name }}</h4>
      <!-- responsables -->
      <div class="card mb-5">
        <div class="card-header">
          Responsables
        </div>
        <div class="card-body">
          <table class="table">
            <tr
              v-for="responsable in responsables"
              :key="responsable.user_id"
            >
              <td>{{ responsable.function }}</td>
              <td>{{ responsable.user.last_name }}</td>
              <td>{{ responsable.user.first_name }} </td>
              <td>{{ responsable.user.contact && responsable.user.contact.address }}</td>
              <td>{{ responsable.user.contact && responsable.user.contact.npa }}</td>
              <td>{{ responsable.user.contact && responsable.user.contact.city }}</td>
              <td>{{ responsable.user.contact && responsable.user.contact.phone }}</td>
              <td>{{ responsable.user.email }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- teams -->
      <h5>Teams</h5>
      <div
        class="card mb-3"
        v-for="team in teams"
        :key="team.id"
      >
        <div class="card-header">
          <router-link :to="{ name: 'TeamShow', params: { id: team.id }}">{{ team.name }}</router-link>
        </div>
        <div class="card-body">
          <table>
            <tr>
              <td width="200">Level</td>
              <td>{{ team.level && team.level.name }}</td>
            </tr>
            <tr>
              <td>Group</td>
              <td>{{ team.group && team.group.name }}</td>
            </tr>
            <tr>
              <td>Members</td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="team_player in team.team_players"
                    :key="team_player.id"
                  >
                    {{ team_player.user.first_name }}
                    {{ team_player.user.last_name }}
                    <span v-if="team_player.user.role">({{ team_player.user.role }})</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr></tr>
          </table>
        </div>
      </div>
    </template>
  </app-layout>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loaded: false,
      club: null,
      responsables: [],
      teams: [],
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const id = this.$route.params.id;
      axios.get(`/clubs/clubs/${id}/show`)
        .then(({ data }) => {
          console.log('club data', data);
          this.club = data.club;
          this.responsables = data.responsables;
          this.teams = data.teams;
          this.loaded = true;
        })
    },
  }
}
</script>

<style>
</style>