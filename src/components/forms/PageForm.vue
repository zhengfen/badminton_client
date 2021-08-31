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

        <!-- content -->
        <div class="mb-3">
          <label
            :for="'content_'+locale"
          >{{ $t('Content')}}</label>
          <tip-tap
            class="form-control"            
            :id="'content_'+locale"
            v-model="item.content[locale]"
          />
        </div>
      </div>
    </div>

    <div class="text-end"> <button
        type="submit"
        class="btn btn-primary"
      >{{ $t('Submit')}}</button></div>
  </form>
</template>

<script>
import form from '@/mixins/form';
export default {
  mixins: [form],
  data() {
    return {
      path: '/cms/pages/',
      item: {
        title: {}, 
        content: {}
      },       
    }
  }, 
  methods:{
    init_item(){
      this.item = this.item_edit; 
      if (this.item.title == null) this.item.title = {}; 
      if (this.item.content == null) this.item.content = {}; 
    }
  }
}
</script>

<style>
</style>