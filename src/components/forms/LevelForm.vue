<template>
  <form v-on:submit.prevent="mode=='new'? add():update()">
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
        <!-- name -->
        <div class="mb-3">
          <label
            :for="'name_'+locale"
          >{{ $t('Name')}}</label>
          <input
            type="text"
            maxlength="160"
            class="form-control"            
            :id="'name_'+locale"
            v-model="item.name[locale]"
          >
        </div>
      </div>
    </div>

    <div class="text-end"> <button
        type="submit"
        class="btn btn-primary"
      >{{ $t('Save')}}</button></div>
  </form>
</template>

<script>
import form from '@/mixins/form';
export default {
  mixins: [form],
  data() {
    return {
      path: '/competitions/levels/',
      item: {
        name: {}
      }, 
      active_locale: this.$i18n.locale,
    }
  }, 
  methods:{
    init_item(){
      this.item = this.item_edit; 
      if (this.item.name == null) this.item.name = {}; 
    }
  }
}
</script>

<style>
</style>