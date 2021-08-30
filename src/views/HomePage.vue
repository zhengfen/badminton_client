<template>
  <app-layout>
    <template v-slot:content>
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
