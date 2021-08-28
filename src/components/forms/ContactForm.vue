<template>
  <form
    v-on:submit.prevent="mode == 'new' ? add() : update()"
    class="container text-start"
  >
    <div class="mb-3" v-if="mode == 'new'">
      <label for="user">{{ $t("User") }}</label>
      <user-select v-model="user" input_class="form-control" />
    </div>

    <div class="mb-3">
      <label for="phone">{{ $t("Phone") }}</label>
      <input id="phone" type="text" class="form-control" v-model="item.phone" />
    </div>

    <div class="mb-3">
      <label for="address">{{ $t("Address") }}</label>
      <input id="address" type="text" class="form-control" v-model="item.address" />
    </div>

    <div class="mb-3">
      <label for="npa">{{ $t("Postal codes") }}</label>
      <input id="npa" type="text" class="form-control" v-model="item.npa" />
    </div>

    <div class="mb-3">
      <label for="city">{{ $t("City") }}</label>
      <input id="city" type="text" class="form-control" v-model="item.city" />
    </div>

    <div v-if="item.image">
      <img class="img-fluid mx-auto d-block" v-bind:src="asset(item.image)" />
      <input type="checkbox" name="deleteImage" id="deleteImage" v-model="checked" />
      <label for="deleteImage">{{ $t("Delete") }}?</label>
    </div>

    <img class="img-fluid mx-auto d-block" v-bind:src="image_src" v-if="image_src" />
    <image-upload name="image" class="me-1" @loaded="onLoad"></image-upload>

    <div class="text-end">
      <button type="submit" class="btn btn-info text-white">{{ $t("Save") }}</button>
    </div>
  </form>
</template>

<script>
import form from "@/mixins/form";
export default {
  mixins: [form],
  data() {
    return {
      path: "/clubs/contacts/",
      user: null,
      uploaded: false, // image-upload
      file: null, // image-upload
      checked: false,
      image_src: null,
    };
  },
  methods: {
    init_item() {
      this.item = this.item_edit;
      this.user = this.item.user; 
    },
    add() {
      if (this.user) this.item.user = this.user.id;
      let formData = this.toFormData(this.item);
      axios
        .post(this.path, formData)
        .then(({ data }) => {
          this.$emit("created", data);
          this.item = {};
        })
        .catch((error) => console.log(error.response && error.response.data));
    },
    // user: ["Incorrect type. Expected pk value, received dict."]
    update() {
      var formData = new FormData();
      for (var key in this.item) {
        if (this.item[key] !== null && key !== 'image' && key!=='user') formData.append(key, this.item[key]);
      }
      formData.user = this.item.user.id; 
      if (this.checked) formData.append("deleteImage", this.checked);
      if (this.uploaded == true) {
        formData.append("image", this.file);
      }
      axios
        .put(this.path + `${this.item.id}/`, formData)
        .then(({ data }) => {
          this.$emit("updated", data);
        })
        .catch((error) => console.log(error.response && error.response.data));
    },
    // iamge-upload
    onLoad(image) {
      this.image_src = image.src;
      this.uploaded = true;
      this.file = image.file;
    },
  },
};
</script>

<style></style>
