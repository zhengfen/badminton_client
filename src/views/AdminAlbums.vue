<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-3">
        <strong>{{ $t("Albums") }}</strong>

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
          <button
            class="btn btn-info btn-sm"
            @click="showAddModal = true"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ $t("Title") }}</th>
            <th>{{ $t("Description") }}</th>
            <th>{{ $t("Action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>
              <template v-if="item.title">
                <div
                  v-for="locale of $i18n.availableLocales"
                  :key="locale"
                >
                  {{ locale }}: {{ item.title[locale] }}
                </div>
              </template>
            </td>
            <td>
              <template v-if="item.content">
                <div
                  v-for="locale of $i18n.availableLocales"
                  :key="locale"
                >
                  {{ locale }}: {{ item.content[locale] }}
                </div>
              </template>
            </td>
            <td>
              <i
                class="fas fa-images text-purple"
                @click="show_dropzone_modal(item)"
              ></i>

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

      <!-- Dropzone Modal-->
      <vue-modal v-model="showDropzoneModal">
        <div
          class="card modal-wrapper"
          style="width: 90vw"
        >
          <div class="card-header">
            <h3></h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showDropzoneModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <div>
              <div v-bind="getRootProps()">
                <input v-bind="getInputProps()">
                <p>Drop the files here ...</p>
                <div
                  v-if="isDragReject"
                  id="isDragReject"
                >
                  isDragReject: {{ isDragReject }}
                </div>
              </div>
              <button @click="onClick">open</button>
            </div>
          </div>
        </div>
      </vue-modal>

      <!-- Add Modal -->
      <vue-modal v-model="showAddModal">
        <div
          class="card modal-wrapper"
          style="width: 90vw"
        >
          <div class="card-header">
            <h3>{{ $t("Add") }} {{ $t("Album") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showAddModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <album-form
              mode="new"
              @created="add_item"
            />
          </div>
        </div>
      </vue-modal>

      <!-- Edit Modal -->
      <vue-modal v-model="showEditModal">
        <div
          class="card modal-wrapper"
          style="width: 90vw"
        >
          <div class="card-header">
            <h3>{{ $t("Edit") }} {{ $t("Album") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showEditModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <album-form
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
          style="width: 600px"
        >
          <div class="card-header">
            <h3>{{ $t("Delete") }} {{ $t("Album") }}</h3>
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
              <button
                class="btn btn-primary"
                @click="delete_item"
              >
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
import { defineComponent, reactive } from 'vue'
import { useDropzone } from 'vue3-dropzone';

export default {
  mixins: [collection],
  data() {
    return {
      path: "/cms/albums",
      showDropzoneModal: false
    };
  },
  methods: {
    show_dropzone_modal(item) {
      this.item_edit = item;
      this.showDropzoneModal = true;
    },
  },
  setup() {
    const url = `/cms/albums/{this.item_edit.id}/photos`; // Your url on the server side
    const saveFiles = (files) => {
      const formData = new FormData(); // pass data as a form
      for (var x = 0; x < files.length; x++) {
        // append files as array to the form, feel free to change the array name
        formData.append("images[]", files[x]);
      }

      // post the formData to your backend where storage is processed. In the backend, you will need to loop through the array and save each file through the loop.

      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.info(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    function onDrop(acceptFiles, rejectReasons) {
      saveFiles(acceptFiles); // saveFiles as callback
      console.log(rejectReasons);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      getRootProps,
      getInputProps,
      ...rest,
    };
  }
};
</script>

<style>
</style>