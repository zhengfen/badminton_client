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
    }
  }
}
</script>

<style>
</style>