<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-3">
        <strong>{{ $t("Contacts") }}</strong>

        <!-- filters -->
        <div class="flex-right-parent ms-auto">
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
            <th>{{ $t("User") }}</th>
            <th>{{ $t("Phone") }}</th>
            <th>{{ $t("Address") }}</th>
            <th>{{ $t("Postal codes") }}</th>
            <th>{{ $t("City") }}</th>
            <th>{{ $t("Image") }}</th>
            <th>{{ $t("Action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <user-info :user="item.user" />
            </td>
            <td>{{ item.phone }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.npa }}</td>
            <td>{{ item.city }}</td>
            <td><img :src="asset(item.image)" class="contact-image" v-if="item.image" /></td>
            <td>
              <i class="fas fa-edit text-primary me-2" @click="show_edit_modal(item)">
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
            <h3>{{ $t("Add") }} {{ $t("Contact") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showAddModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <contact-form mode="new" @created="add_item" />
          </div>
        </div>
      </vue-modal>

      <!-- Edit Modal -->
      <vue-modal v-model="showEditModal">
        <div class="card" style="width: 600px">
          <div class="card-header">
            <h3>{{ $t("Edit") }} {{ $t("Contact") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showEditModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <contact-form
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
            <h3>{{ $t("Delete") }} {{ $t("Contact") }}</h3>
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
export default {
  mixins: [collection],
  data() {
    return {
      path: "/clubs/contacts",
    };
  },
  methods:{
    update_item(data) {
      console.log('payload', data); 
      var item = this.items.find(elem => elem.id == data.id);
      item.image = data.image;
      this.showEditModal = false;
    },
  }
};
</script>

<style></style>
