<template>
  <app-layout>
    <template
      v-if="loaded"
      v-slot:content
    >
      <h4>{{ club.name }}</h4>
      <!-- responsibles -->
      <div class="card mb-5">
        <div class="card-header">
          {{ $t('Responsibles') }}
        </div>
        <div class="card-body">
          <table class="table">
            <tr
              v-for="responsible in responsibles"
              :key="responsible.user_id"
            >
              <td>{{ responsible.function }}</td>
              <td>{{ responsible.user.last_name }}</td>
              <td>{{ responsible.user.first_name }} </td>
              <td>{{ responsible.user.contact && responsible.user.contact.address }}</td>
              <td>{{ responsible.user.contact && responsible.user.contact.npa }}</td>
              <td>{{ responsible.user.contact && responsible.user.contact.city }}</td>
              <td>{{ responsible.user.contact && responsible.user.contact.phone }}</td>
              <td>{{ responsible.user.email }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- teams -->
      <h5>{{ $t('Teams') }}</h5>
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
              <td width="200">{{ $t('Level') }}</td>
              <td>{{ team.level && trans(team.level.name) }}</td>
            </tr>
            <tr>
              <td>{{ $t('Group') }}</td>
              <td>{{ team.group && team.group.name }}</td>
            </tr>
            <tr>
              <td>{{ $t('Players') }}</td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="team_player in team.team_players"
                    :key="team_player.id"
                  >
                    {{ team_player.player.first_name }}
                    {{ team_player.player.last_name }}
                    <span v-if="team_player.position">({{ trans(getPositionNameById(team_player.position)) }})</span>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loaded: false,
      club: null,
      responsibles: [],
      teams: [],
    }
  },
  created() {
    this.$store.dispatch('clubs/fetchPositionsAction'); 
    this.fetch();
  },
  computed:{
    ...mapGetters('clubs', [
      'getPositionNameById'
    ])
  },
  methods: {
    fetch() {
      const slug = this.$route.params.slug;
      axios.get(`/clubs/club/${slug}`)
        .then(({ data }) => {
          console.log('club data', data);
          this.club = data.club;
          this.responsibles = data.responsibles;
          this.teams = data.teams;
          this.loaded = true;
        })
    },
  }
}
</script>

<style>
</style>