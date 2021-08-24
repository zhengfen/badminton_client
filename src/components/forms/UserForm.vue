<template>
  <form
    v-on:submit.prevent="mode=='new'?add():update()"
    class="container text-start"
  >
    <!-- if club_id is not defined by props, then select club-->
    <div class="mb-3">
      <label for="first_name">{{ $t('First name')}} <span class="text-danger">*</span></label>
      <input
        id="first_name"
        type="text"
        class="form-control"
        v-model="item.first_name"
        required
      >
    </div>

    <div class="mb-3">
      <label for="last_name">{{ $t('Family name')}}  <span class="text-danger">*</span></label>
      <input
        id="last_name"
        type="text"
        class="form-control"
        v-model="item.last_name"
        required
      >
    </div>

    <div class="mb-3">
      <label for="email">{{ $t('Email')}} <span class="text-danger">*</span></label>
      <input
        id="email"
        type="text"
        class="form-control"
        v-model="item.email"
        required
      >
    </div>

    <div class="mb-3">
      <label for="birthday">{{ $t('Birthday')}} <span class="text-danger">*</span></label>
      <input
        id="birthday"
        type="date"
        class="form-control"
        v-model="item.birthday"
        required
      >
    </div>

    <div class="mb-3">
      <label for="sex">{{ $t('Sex')}} <span class="text-danger">*</span></label>
      <select
        id="sex"
        class="form-control"
        v-model="item.sex"
        required
      >
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

    </div>

    <div class="text-end">
      <button
        type="submit"
        class="btn btn-info text-white"
      >Save</button>
    </div>
  </form>
</template>

<script>  
import form from '@/mixins/form';
export default {
  mixins: [form],
  props: {
    club_id: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      path: '/clubs/users/'
    }
  },
  methods: {
  }
}
</script>

<style>
</style>