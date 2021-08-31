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
      <label for="subject_type">{{ $t('Subject')}}</label>
      <select name="subject_type" id="subejct_type" v-model="item.subject_type" class="form-control">
        <option value="Association">{{ $t('Association') }}</option>
        <option value="Club">{{ $t('Club') }}</option>
      </select>
    </div>
  
    <!-- translable fields -->
    <ul class="nav nav-tabs mb-3">
      <li
        v-for="locale of $i18n.availableLocales"
        :key="locale"
        @click="active_locale = locale"
      >
        <a
          data-toggle="tab"
          :href="'#tab_' + locale"
          class="nav-link text-uppercase"
          :class="{ active : active_locale==locale }"
        >{{ locale }}</a>
      </li>
    </ul>

    <div class="tab-content">
      <div
        v-for="locale of $i18n.availableLocales"
        :key="locale"
        :id="'tab_' + locale"
        class="tab-pane fade"
        :class="{ show : active_locale==locale, active: active_locale==locale}"
      >
        <!-- title -->
        <div class="mb-3">
          <label
            :for="'title_'+locale"
          >{{ $t('Title')}}</label>
          <input
            type="text"
            maxlength="255"
            class="form-control"            
            :id="'title_'+locale"
            v-model="item.title[locale]"
          >
        </div>
      </div>
    </div>

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
      path: "/clubs/committee/",
      item: {
        title: {}, 
      },
      user: null,
      active_locale: this.$i18n.locale,
    };
  },
  methods: {
    init_item() {
      this.item = this.item_edit;
      this.user = this.item.user; 
    },
    add() {     
      const payload = JSON.parse(JSON.stringify(this.item))
      if (this.user) payload.user = this.user.id;
      axios
        .post(this.path, payload)
        .then(({ data }) => {
          this.$emit("created", data);
          this.item = {
            title: {}, 
          };
        })
        .catch((error) => console.log(error.response && error.response.data));
    },
    // user: ["Incorrect type. Expected pk value, received dict."]
    update() {
      const payload = JSON.parse(JSON.stringify(this.item))
      if (this.user) payload.user = this.user.id;
      delete payload.image; // bad request. Image is not file
      axios
        .patch(this.path + `${this.item.id}/`, payload)
        .then(({ data }) => {
          this.$emit("updated", data);
        })
        .catch((error) => console.log(error.response && error.response.data));
    },
  },
};
</script>

<style></style>
