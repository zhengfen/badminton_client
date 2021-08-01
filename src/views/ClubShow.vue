<template>
  <div v-if="club">
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
      class="card"
      v-for="team in teams"
      :key="team.id"
    >
      <div class="card-header">
        {{ team.name }}
      </div>
      <div class="card-body">
        <table class="tab">
          <tr>
            <td>Group</td>
            <td>{{ team.group.name }}</td>
          </tr>
          <tr>
            <td>Captain</td>
            <td></td>
          </tr>
          <tr>
            <td>Members</td>
            <td>
              <buttun
                class="btn btn-sm btn-primary"
                @click="show_player_add_modal(team.id)"
              >
                <i class="fas fa-plus"></i>
              </buttun>
            </td>
          </tr>
          <tr></tr>
        </table>

      </div>
    </div>

    <el-dialog
      title="addPlayer"
      v-model="playerAddVisible"
      width="30%"
    >
      <player-form mode="new" :team_id="team_id" />
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      club: null,
      responsables: [],
      teams: [],
      team_id: undefined,  // team_id for player form
      playerAddVisible: false,
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const id = this.$route.params.id;
      axios.get(`/clubs/${id}`)
        .then(({ data }) => {
          console.log('club data', data);
          this.club = data.club;
          this.responsables = data.responsables;
          this.teams = data.teams;
        })
    },
    show_player_add_modal(team_id) {
      this.player_add_team_id = team_id;
      this.playerAddVisible = true; 
    }
  }
}
</script>

<style>
</style>