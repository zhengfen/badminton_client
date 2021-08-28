<template>
  <div>
    <div class="row mb-3">
      <label for="team_select">{{ $t('Select a team') }}</label>
      <div class="col-8">
        <select
          v-model="selectedTeam"
          class="form-control"
          id="team_select"
        >
          <option
            v-for="team in team_options()"
            :key="team.id"
            :value="team.id"
          >{{ team.name }}</option>
        </select>
      </div>
      <div class="col-4">
        <button
          class="btn btn-sm btn-primary"
          @click="add_team"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>

    <ul class="list-unstyled">
      <li
        v-for="player_team in player_teams"
        :key="player_team.id"
      >
        {{ player_team.team.name }}

        <select
          v-model="player_team.position"
          @change="update_position(player_team.id, $event.target.value)"
        >
          <option value=""></option>
          <option
            v-for="position in positions"
            :key="position.id"
            :value="position.id"
          >{{ trans(position.name) }}</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  setup() {
    // Get toast interface
    const toast = useToast();
    // Make it available inside methods
    return { toast }
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clubTeams: [],
      selectedTeam: null,
      player_teams: this.player.teams
    }
  },
  computed: {
    positions() {
      return this.$store.state.clubs.positions;
    }
  },
  created() {
    this.fetch_club_teams();
    console.log(this.player.teams);
  },
  methods: {
    fetch_club_teams() {
      const club_id = this.player.club;
      axios.get('/clubs/teams/all', { params: { club: club_id } })
        .then(({ data }) => this.clubTeams = data)
        .catch(error => console.log(error.reponse && error.response.data));
    },
    team_options() {
      const selectedIds = this.player_teams.map(elem => elem.team.id);
      return this.clubTeams.filter(elem => !selectedIds.includes(elem.id));
    },
    add_team() {
      if (!this.selectedTeam) {
        this.toast.warning("Please select a team");
        return;
      }
      axios.post('/clubs/team-player/', {
        team: this.selectedTeam,
        player: this.player.id,
        with: 'team'
      }).then(({ data }) => {
        console.log(data);
        this.player_teams.push(data);
      })
        .catch(error => console.log(error.response && error.response.data));
    },
    update_position(id, value) {
      axios.patch(`/clubs/team-player/${id}/`, { position: value })
        .then(({ data }) => console.log(data))
        .catch(error => console.log(error.response && error.response.data));
    }
  }
}
</script>

<style>
</style>