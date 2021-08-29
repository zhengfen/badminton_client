<template>
  <div>
    <div class="container-fluid d-flex py-2">
      <!-- menu button for left sidebar-->
      <i class="fas fa-bars pointer fa-lg me-auto" @click="openLeftNav"></i>

      <locale-selection class="me-4" />
    </div>

    <div class="container" style="padding-top: 30px; padding-bottom: 30px" name="content">
      <slot name="content"></slot>
    </div>

    <div class="screen-overlay" v-if="showScreenOverlay" @click="closeNav"></div>
    <div
      class="screen-offcanvas px-3"
      id="offcanvas-left"
      :style="{ left: leftNavValue }"
    >
      <div class="sidebar-wrapper">
        <div class="text-right mb-md-5">
          <i class="fas fa-times fa-lg" @click="closeLeftNav"></i>
        </div>

        <nav-app-left />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("layout", ["showScreenOverlay", "leftNavValue"]),
  },
  methods: {
    openLeftNav() {
      this.$store.commit("layout/openLeftNav");
    },
    closeNav() {
      this.$store.commit("layout/closeNav");
    },
    closeLeftNav() {
      this.$store.commit("layout/closeLeftNav");
    },
  },
};
</script>

<style></style>
