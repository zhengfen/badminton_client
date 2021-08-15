<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-2">
        <strong>{{ $t('Players') }}</strong>
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
            <th>{{ $t('First name') }}</th>
            <th>{{ $t('Last name') }}</th>
            <th>{{ $t('Sex') }}</th>
            <th>{{ $t('Birthday') }}</th>
            <th>{{ $t('Email') }}</th>
            <th>{{ $t('Club') }}</th>
            <th>{{ $t('Teams') }}</th>
            <th>{{ $t('Licence') }}</th>
            <th>{{ $t('Action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.birthday }}</td>
            <td>{{ item.email }}</td>
            <td>{{ getClubNameById(item.club) }}</td>
            <td @click="show_team_modal(item)">
              <div
                class="pointer"
                v-for="team in item.teams"
                :key="team.id"                
              >{{ team.team.name }} - {{ getLevelNameById(team.team.level) }} <span v-if="team.position">{{ getPositionNameById(team.position) }}</span></div>
            </td>
            <td>{{ item.licence }}</td>
            <td>
              <i
                class="fas fa-edit text-primary me-2"
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
      <!-- Team Modal-->
      <vue-modal v-model="showTeamModal">
        <div
          class="card"
          style="width:600px;"
        >
          <div class="card-header">
            <h3>{{ $t('Associated teams') }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showTeamModal = false"
            >&times;</button>
          </div>

          <div class="card-body">
            <player-teams :player="item_edit" v-if="showTeamModal" />
          </div>
        </div>
      </vue-modal>

      <!-- Add Modal -->
      <vue-modal v-model="showAddModal">
        <div
          class="card"
          style="width:600px;"
        >
          <div class="card-header">
            <h3>{{ $t('Add') }} {{ $t('Player') }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showAddModal = false"
            >&times;</button>
          </div>
          <div class="card-body">
            <player-form
              mode="new"
              @created="add_item"
            />
          </div>
        </div>
      </vue-modal>

      <!-- Edit Modal -->
      <vue-modal v-model="showEditModal">
        <div
          class="card"
          style="width:600px;"
        >
          <div class="card-header">
            <h3>{{ $t('Edit') }} {{ $t('Player') }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showEditModal = false"
            >&times;</button>
          </div>
          <div class="card-body">
            <player-form
              mode="edit"
              :item_edit="item_edit"
              @updated="update_item"
              v-if="showEditModal"
            />
          </div>
        </div>
      </vue-modal>

      <!-- Delete Modal -->
      <vue-modal v-model="showDeleteModal">
        <div
          class="card"
          style="width:600px;"
        >
          <div class="card-header">
            <h3>{{ $t('Delete') }} {{ $t('Player') }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showDeleteModal = false"
            >&times;</button>
          </div>
          <div class="card-body">
            <p>{{ $t('Please confirm') }}</p>
            <div class="text-end">
              <button
                class="btn btn-primary"
                @click="delete_item"
              >{{ $t('Confirm') }}</button>
            </div>
          </div>
        </div>
      </vue-modal>

    </template>
  </admin-layout>
</template>

<script>
import collection from '../mixins/collection';
import { mapState, mapGetters } from 'vuex'
export default {
  mixins: [collection],
  data() {
    return {
      path: '/clubs/players',
      // filter
      club_id: null,
      showTeamModal: false,
    };
  },
  computed: {
    ...mapState('clubs', [
      'clubs',
    ]),
    ...mapState('competitions', [
      'levels',
    ]),
    ...mapGetters('clubs', [
      'getClubNameById', 
      'getPositionNameById',
    ]),
    ...mapGetters('competitions', [
      'getLevelNameById',
    ])
  },
  created() {
    this.$store.dispatch('clubs/fetchClubsAction');
    this.$store.dispatch('clubs/fetchPositionsAction'); 
    this.$store.dispatch('competitions/fetchLevelsAction');
  },
  methods: {
    url(page) {
      if (!page) {
        let query = location.search.match(/page=(\d+)/);
        page = query ? query[1] : 1;
      }
      const offset = (page - 1) * this.limit;
      let url = this.path + `?limit=${this.limit}&offset=${offset}`;
      if (this.club_id > 0) url += `&club=${this.club_id}`;
      if (this.search_input.length > 0) url += `&search=${this.search_input}`;
      return url;
    },
    show_team_modal(item) {
      this.item_edit = item;
      this.showTeamModal = true;
    }
  }
}
</script>

<style>
</style>
