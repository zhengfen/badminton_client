<template>
  <form
    v-on:submit.prevent="mode=='new'? add():update()"
  >
    <div class="mb-3">
      <label
        for="name"
        class="form-label"
      >{{ $t('Name')}}</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="item.name"
      >
    </div>

    <div class="mb-3">
      <label
        for="city"
        class="form-label"
      >{{ $t('City')}}</label>
      <input
        type="text"
        class="form-control"
        id="city"
        v-model="item.city"
      >
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
        <!-- description -->
        <div class="mb-3">
          <label
            :for="'description_'+locale"
          >{{ $t('Description')}}</label>
          <tip-tap
            class="form-control"            
            :id="'description_'+locale"
            v-model="item.description[locale]"
          />
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
  data(){
    return {
      path: '/clubs/clubs/',
      item: {
        description: {}, 
      },   
    }
  }, 
    methods:{
    init_item(){
      this.item = this.item_edit; 
      if (this.item.description == null) this.item.description = {}; 
    }
  }
}
</script>

<style>
</style>