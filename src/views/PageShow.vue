<template>
  <app-layout>
    <template v-slot:content>
      <div
        class="content-container"
        v-if="page"
      >
        <div v-html="trans(page.content)" />
        <committee-page v-if="page.id==2" />
        <clubs-page v-if="page.id==3" />
        {{ page }}
      </div>
    </template>    
  </app-layout>
</template>

<script>
export default {
  computed: {
    page() {
      const slug = this.$route.params.slug;
      return this.$store.getters['cms/getPageBySlug'](slug);
    }
  }
}
</script>
