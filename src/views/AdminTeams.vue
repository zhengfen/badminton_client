<template>
  <admin-layout>
    <template v-slot:content>
      <div class="d-flex mb-2">
        <strong>Teams</strong>
        <!-- filters -->
        <div class="flex-right-parent ml-auto">
        </div>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Reference</th>
            <th>Club</th>
            <th>Group</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name}}</td>
            <td>{{ item.reference}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {{ index }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </admin-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      axios.get('/clubs/teams').then(({ data }) => {
        this.items = data;
      })
    }
  }
}
</script>

<style>
</style>
