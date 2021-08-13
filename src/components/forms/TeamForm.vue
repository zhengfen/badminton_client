<template>
  <form
    v-if="clubs"
    v-on:submit.prevent="mode=='new'? add():update()"
  >
    <div class="mb-3">
      <label
        for="name"
        class="form-label"
      >Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="item.name"
      >
    </div>
    <div class="mb-3">
      <label
        for="reference"
        class="form-label"
      >Reference</label>
      <input
        type="text"
        class="form-control"
        id="reference"
        v-model="item.reference"
      >
    </div>

    <div class="mb-3">
      <label
        for="club"
        class="form-label"
      >Club</label>
      <vue-select
        v-model="item.club"
        :options="clubs"
        label-by="name"
        value-by="id"
        :close-on-select="true"
        placeholder="Club"
        :searchable="true"
      />
    </div>

    <div class="mb-3">
      <label
        for="level"
        class="form-label"
      >Level</label>
      <vue-select
        v-model="item.level"
        :options="levels"
        label-by="name"
        value-by="id"
        :close-on-select="true"
        placeholder="Level"
        :searchable="true"
      />
    </div>

    <div class="mb-3">
      <label
        for="group"
        class="form-label"
      >Group</label>
      <vue-select
        v-model="item.group"
        :options="groups"
        label-by="name"
        value-by="id"
        :close-on-select="true"
        placeholder="Group"
        :searchable="true"
      />
    </div>

    <div class="text-end"> <button
        type="submit"
        class="btn btn-primary"
      >Submit</button></div>
  </form>
</template>

<script>
import form from '@/mixins/form';
import { mapState } from 'vuex'
export default {
  mixins: [form],
  data() {
    return {
      path:'/clubs/teams/',
    }
  },
  computed: {
    ...mapState('clubs', [
      'clubs',
    ]),
    ...mapState('competitions', [
      'levels',
      'groups',
    ]),
  },
  methods: {

  }
}
</script>

<style>
</style>