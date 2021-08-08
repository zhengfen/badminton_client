<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-2">
        <strong>Teams</strong>
        <!-- filters -->
        <div class="flex-right-parent ms-auto">
          <!-- club filter -->
          <vue-select
            v-model="club_id"
            :options="clubs"
            label-by="name"
            value-by="id"
            :close-on-select="true"
            placeholder="Club"
            :searchable="true"
            :clear-on-select="true"
            @selected="next_tick_fetch(1)"
          />

          <!-- level filter -->
          <vue-select
            v-model="level_id"
            :options="levels"
            label-by="name"
            value-by="id"
            :close-on-select="true"
            placeholder="Level"
            :searchable="true"
            :clear-on-select="true"
            @selected="next_tick_fetch(1)"
          />

          <!-- group filter -->
          <vue-select
            v-model="group_id"
            :options="groups"
            label-by="name"
            value-by="id"
            :close-on-select="true"
            placeholder="Group"
            :searchable="true"
            :clear-on-select="true"
            @selected="next_tick_fetch(1)"
          />

          <!-- search input -->
          <input
            type="text"
            v-model="search_input"
            placeholder="recherche"
            v-on:keyup.enter="fetch(1)"
            class="search-input"
          >

          <!-- add button -->
          <button
            class="btn btn-info btn-sm"
            @click="showAddModal=true"
          ><i class="fas fa-plus"></i></button>
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
                @click="show_edit_modal(item)"
              >
              </i>
              <i
                class="fas fa-trash-alt text-danger"
                @click="show_delete_modal(item, index)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>

      <django-paginator
        :count="count"
        :previous="previous"
        :next="next"
        :limit="limit"
        @page_changed="fetch"
      />

      <!-- Add Modal -->
      <vue-modal
        v-model="showAddModal"
        name="teamAddModal"
        :max-width="600"
      >
        <div class="card">
          <div class="card-header">
            <h3>Add Team</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showAddModal = false"
            >&times;</button>
          </div>
          <div class="card-body">
            <team-form
              mode="new"
              @created="add_item"
            />
          </div>
        </div>
      </vue-modal>

      <!-- Edit Modal -->
      <vue-modal
        v-model="showEditModal"
        name="teamEditModal"
        :max-width="600"
      >
        <div class="card">
          <div class="card-header">
            <h3>Modifier Team</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showEditModal = false"
            >&times;</button>
          </div>
          <div class="card-body">
            <team-form
              mode="edit"
              :item_edit="item_edit"
              @updated="update_item"
              v-if="showEditModal"
            />
          </div>
        </div>
      </vue-modal>

    </template>
  </admin-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      path: '/clubs/teams',
      items: [],
      item_edit: {},
      // pagination
      count: undefined,
      next: undefined,
      previous: undefined,
      limit: 20,  // default 
      // filter
      club_id: null,
      level_id: null,
      group_id: null,
      search_input: '',
      // modal
      showAddModal: false,
      showEditModal: false
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
    next_tick_fetch(page) {
      this.$nextTick(() => {
        this.fetch(page);
      })
    },
    fetch(page) {
      axios.get(this.url(page)).then(({ data }) => {
        this.items = data.results;
        this.count = data.count;
        this.next = data.next;
        this.previous = data.previous;
        // limit
        if (this.next && this.next.match(/limit=(\d+)/)) this.limit = parseInt(this.next.match(/limit=(\d+)/)[1]);
        else if (this.previous && this.previous.match(/limit=(\d+)/)) this.limit = parseInt(this.previous.match(/limit=(\d+)/)[1]);
        else { this.limit = 10 }
      })
    },
    url(page) {
      if (!page) {
        let query = location.search.match(/page=(\d+)/);
        page = query ? query[1] : 1;
      }
      const offset = (page - 1) * this.limit;
      let url = this.path + `?limit=${this.limit}&offset=${offset}`;
      if (this.club_id > 0) url += `&club=${this.club_id}`;
      if (this.level_id > 0) url += `&level=${this.level_id}`;
      if (this.group_id > 0) url += `&group=${this.group_id}`;
      if (this.search_input.length > 0) url += `&search=${this.search_input}`;
      return url;
    },
    add_item(newItem) {
      this.items.unshift(newItem);
      this.showAddModel = false;
    },
    show_edit_modal(item) {
      this.item_edit = item;
      this.showEditModal = true;
    },
    update_item() {
      this.showEditModal = false;
      this.showEditModal = false;
    }, 
    show_delete_modal(){
      // TODO
    }
  }
}
</script>

<style>
</style>
