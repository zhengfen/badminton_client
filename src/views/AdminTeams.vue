<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-2">
        <strong>{{ $t("Teams") }} </strong>
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
          >
            <template #label="{ selected }">
              <template v-if="selected">
                <div>{{ trans(selected.name) }}</div>
              </template>
              <template v-else>Select option</template>
            </template>

            <template #dropdown-item="{ option }">
              <div>{{ trans(option.name) }}</div>
            </template>
          </vue-select>

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
          />

          <!-- add button -->
          <button class="btn btn-info btn-sm" @click="showAddModal = true">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ $t("Name") }}</th>
            <th>{{ $t("Reference") }}</th>
            <th>{{ $t("Club") }}</th>
            <th>{{ $t("Level") }}</th>
            <th>{{ $t("Group") }}</th>
            <th>{{ $t("Action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.reference }}</td>
            <td>{{ getClubNameById(item.club) }}</td>
            <td>{{ trans(getLevelNameById(item.level)) }}</td>
            <td>{{ getGroupNameById(item.group) }}</td>
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

      <!-- Add Modal -->
      <vue-modal v-model="showAddModal">
        <div class="card" style="width: 600px">
          <div class="card-header">
            <h3>{{ $t("Add") }} {{ $t("Team") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showAddModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <team-form mode="new" @created="add_item" />
          </div>
        </div>
      </vue-modal>

      <!-- Edit Modal -->
      <vue-modal v-model="showEditModal">
        <div class="card" style="width: 600px">
          <div class="card-header">
            <h3>{{ $t("Edit") }} {{ $t("Team") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showEditModal = false"
            >
              &times;
            </button>
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

      <!-- Delete Modal -->
      <vue-modal v-model="showDeleteModal">
        <div class="card" style="width: 600px">
          <div class="card-header">
            <h3>{{ $t("Delete") }} {{ $t("Team") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showDeleteModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <p>{{ $t("Please confirm") }}</p>
            <div class="text-end">
              <button class="btn btn-primary" @click="delete_item">
                {{ $t("Confirm") }}
              </button>
            </div>
          </div>
        </div>
      </vue-modal>
    </template>
  </admin-layout>
</template>

<script>
import collection from "../mixins/collection";
import { mapState, mapGetters } from "vuex";
export default {
  mixins: [collection],
  data() {
    return {
      path: "/clubs/teams",
      // filter
      club_id: null,
      level_id: null,
      group_id: null,
    };
  },
  computed: {
    ...mapState("clubs", ["clubs"]),
    ...mapState("competitions", ["levels", "groups"]),
    ...mapGetters("clubs", ["getClubNameById"]),
    ...mapGetters("competitions", ["getLevelNameById", "getGroupNameById"]),
  },
  created() {
    this.$store.dispatch("clubs/fetchClubsAction");
    this.$store.dispatch("competitions/fetchLevelsAction");
    this.$store.dispatch("competitions/fetchGroupsAction");
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
      if (this.level_id > 0) url += `&level=${this.level_id}`;
      if (this.group_id > 0) url += `&group=${this.group_id}`;
      if (this.search_input.length > 0) url += `&search=${this.search_input}`;
      console.log('level_id', this.level_id); 
      console.log('url', url);
      return url;
    },
    print(value){
      console.log('value', value); 
    }
  },
};
</script>

<style>
</style>
