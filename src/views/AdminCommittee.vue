<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-3">
        <strong>{{ $t("Committee") }}</strong>

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
            <th>{{ $t("Subject") }}</th>
            <th>{{ $t("Title") }}</th>
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
            <td>{{ item.subject_type }} {{ item.subject_id }}</td>
            <td>
              <template v-if="item.title">
                <div v-for="locale of $i18n.availableLocales" :key="locale">
                  {{ locale }}: {{ item.title[locale] }}
                </div>
              </template>
            </td>
            <td>
              <img
                :src="asset(item.image)"
                class="committee-image mx-auto d-block"
                v-if="item.image"
              />
            </td>
            <td>
              <i class="far fa-image text-primary pointer me-2" @click="show_image_modal(item)"></i>
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

      <!-- Image Modal -->
      <my-upload
        field="image"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="showImageModal"
        :width="200"
        :height="250"
        :url="asset(`/clubs/committee/${item_edit.id}/`)"
        img-format="png"
        method="PATCH"
        :noCircle="true"
        :noSquare="true"
        :langType="$i18n.locale"
        :key="cropUploadKey"
      ></my-upload>
      <img :src="imgDataUrl" />

      <!-- Add Modal -->
      <vue-modal v-model="showAddModal">
        <div class="card" style="width: 600px">
          <div class="card-header">
            <h3>{{ $t("Add") }} {{ $t("Committee") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showAddModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <committee-form mode="new" @created="add_item" />
          </div>
        </div>
      </vue-modal>

      <!-- Edit Modal -->
      <vue-modal v-model="showEditModal">
        <div class="card" style="width: 600px">
          <div class="card-header">
            <h3>{{ $t("Edit") }} {{ $t("Committee") }}</h3>
            <button
              class="btn btn-secondary btn-sm ms-auto"
              @click="showEditModal = false"
            >
              &times;
            </button>
          </div>
          <div class="card-body">
            <committee-form
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
            <h3>{{ $t("Delete") }} {{ $t("Committee") }}</h3>
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
import myUpload from "vue-image-crop-upload";
export default {
  mixins: [collection],
  data() {
    return {
      path: "/clubs/committee",
      showImageModal: false,
      imgDataUrl: "", // the datebase64 url of created image
      cropUploadKey: 0,  // to reset the crop-upload step
    };
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    update_item(data) {
      var item = this.items.find((elem) => elem.id == data.id);
      item.image = data.image;
      this.showEditModal = false;
    },
    show_image_modal(item) {
      this.item_edit = item;
      this.showImageModal = true;
    },
    cropUploadSuccess(jsonData, field) {
      let item = this.items.find((elem) => elem.id == jsonData.id);
      item.image = jsonData.image;
      this.showImageModal = false;
      this.cropUploadKey++;
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },
};
</script>

<style></style>
