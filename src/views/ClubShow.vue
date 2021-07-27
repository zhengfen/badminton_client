<template>
  <div v-if="club">
    <h4>{{ club.name }}</h4>
    <div class="card">
      <div class="card-header">
        Responsables
      </div>
      <div class="card-body">
        <table class="table">
          <tr
            v-for="responsable in responsables"
            :key="responsable.user_id"
          >
            <td>{{ responsable.function }}</td>
            <td>{{ responsable.user.last_name }}</td>
            <td>{{ responsable.user.first_name }} </td>
            <td>{{ responsable.user.contact && responsable.user.contact.address }}</td>
            <td>{{ responsable.user.contact && responsable.user.contact.npa }}</td>
            <td>{{ responsable.user.contact && responsable.user.contact.city }}</td>  
            <td>{{ responsable.user.contact && responsable.user.contact.phone }}</td>  
            <td>{{ responsable.user.email }}</td>  
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      club: null, 
      responsables: []
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const id = this.$route.params.id;
      axios.get(`/clubs/${id}`)
        .then(({ data }) => {
          console.log('club data', data);
          this.club = data.club;
          this.responsables = data.responsables;
        })
    }
  }
}
</script>

<style>
</style>