<template>
  <div>
    <div
      class="py-4 text-center"
      style="margin-bottom:0"
    >
      <h1>Badminton Clubs</h1>
      <p>A web application made to practice django and vue3</p>
    </div>
    <nav-app />
    <div class="container" style="padding-top:30px; padding-bottom: 30px;" name="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>