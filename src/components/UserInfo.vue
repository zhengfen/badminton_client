<template>
  <v-popover v-if="user">
    <div class="pointer">{{ user.first_name }} {{ user.last_name }}</div>
    <template #content>
      <div class="card" style="width: 400px;">
        <div class="row">
          <div class="col-sm-4 text-end">
            {{ $t("First name") }} {{ $t("Family name") }}
          </div>
          <div class="col-sm-8">{{ user.first_name }} {{ user.last_name }}</div>
        </div>

        <div class="row">
          <div class="col-sm-4 text-end">{{ $t("Email") }}</div>
          <div class="col-sm-8">{{ user.email }}</div>
        </div>
      </div>
    </template>
  </v-popover>
</template>

<script>
export default {
  props: ['user']
};
</script>

<style></style>
