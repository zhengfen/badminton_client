<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-2">
        <strong>Teams</strong>
        <!-- filters -->
        <div class="flex-right-parent ml-auto">
        </div>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Reference</th>
            <th>Club</th>
            <th>Level</th>
            <th>Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name}}</td>
            <td>{{ item.reference}}</td>
            <td>{{ getClubNameById(item.club) }}</td>
            <td>{{ getLevelNameById(item.level) }}</td>
            <td>{{ getGroupNameById(item.group) }}</td>
            <td>
              <i
                class="fas fa-edit text-primary"
                data-bs-toggle="modal"
                data-bs-target="#teamEditModal"
                @click="show_edit_modal(item)"
              >
              </i>
              {{ index }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Edit Modal -->
      <div
        class="modal fade"
        id="teamEditModal"
        tabindex="-1"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit team</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                v-if="clubs"
                v-on:submit.prevent="update()"
              >
                <div class="mb-3">
                  <label
                    for="name"
                    class="form-label"
                  >Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="item.name"
                  >
                </div>
                <div class="mb-3">
                  <label
                    for="reference"
                    class="form-label"
                  >Reference</label>
                  <input
                    type="text"
                    class="form-control"
                    id="reference"
                    v-model="item.reference"
                  >
                </div>

                <div class="mb-3">
                  <label
                    for="club"
                    class="form-label"
                  >Club</label>
                  <vue-select
                    v-model="selected_club"
                    :options="clubs"
                    label-by="name"
                    :close-on-select="true"
                    placeholder="Club"
                    :searchable="true"
                  />
                </div>

                <div class="mb-3">
                  <label
                    for="level"
                    class="form-label"
                  >Level</label>
                  <vue-select
                    v-model="selected_level"
                    :options="levels"
                    label-by="name"
                    :close-on-select="true"
                    placeholder="Level"
                    :searchable="true"
                  />
                </div>

                <div class="mb-3">
                  <label
                    for="group"
                    class="form-label"
                  >Group</label>
                  <vue-select
                    v-model="selected_group"
                    :options="groups"
                    label-by="name"
                    :close-on-select="true"
                    placeholder="Group"
                    :searchable="true"
                  />
                </div>

                <div class="text-end"> <button
                    type="submit"
                    class="btn btn-primary"
                  >Submit</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
  </admin-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      items: [],
      editDialogVisible: false,
      item: {},
      selected_club: null,
      selected_level: null,
      selected_group: null,
    };
  },
  computed: {
    ...mapState('clubs', [
      'clubs',
    ]),
    ...mapState('competitions', [
      'levels',
      'groups',
    ]),
    ...mapGetters('clubs', [
      'getClubNameById'
    ]),
    ...mapGetters('competitions', [
      'getLevelNameById',
      'getGroupNameById'
    ])
  },
  created() {
    this.$store.dispatch('clubs/fetchClubsAction');
    this.$store.dispatch('competitions/fetchLevelsAction');
    this.$store.dispatch('competitions/fetchGroupsAction');
    this.fetch();
  },
  methods: {
    fetch() {
      axios.get('/clubs/teams').then(({ data }) => {
        this.items = data;
      })
    },
    show_edit_modal(item) {
      this.item = item;
    },
    update() {
      if (this.selected_club) this.item.club = this.selected_club.id;
      if (this.selected_level) this.item.level = this.selected_level.id;
      if (this.selected_group) this.item.group = this.selected_group.id;
      axios.patch(`/clubs/teams/${this.item.id}/`, this.item)
      .then(({ data }) => { console.log(data) })
      .catch(error => console.log(error.response && error.response.data )); 
    }
  }
}
</script>

<style>
</style>
