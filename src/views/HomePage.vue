<template>
  <app-layout>
    <template v-slot:content>
      <div class="py-4 text-center" style="margin-bottom: 0">
        <h1>Badminton Clubs</h1>
        <p>A web application made to practice django and vue3</p>
      </div>

      <div v-html="trans(page.content)" v-if="page" />
    </template>
  </app-layout>
</template>

<script>
export default {
  data(){
    return {
      page:null
    }
  },
  created(){
    axios.get('/cms/pages/1').then(({data}) => {
      this.page = data; 
    }).catch(error => console.log(error.response && error.response.data)); 
  }
};
</script>

<style></style>
