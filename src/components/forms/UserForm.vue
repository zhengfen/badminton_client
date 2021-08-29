<template>
  <form
    v-on:submit.prevent="mode == 'new' ? add() : update()"
    class="container text-start"
  >
    
    <div class="mb-3">
      <label for="first_name"
        >{{ $t("First name") }} <span class="text-danger">*</span></label
      >
      <input
        id="first_name"
        type="text"
        class="form-control"
        v-model="item.first_name"
        required
      />
    </div>

    <div class="mb-3">
      <label for="last_name"
        >{{ $t("Family name") }} <span class="text-danger">*</span></label
      >
      <input
        id="last_name"
        type="text"
        class="form-control"
        v-model="item.last_name"
        required
      />
    </div>

    <div class="mb-3">
      <label for="email">{{ $t("Email") }} <span class="text-danger">*</span></label>
      <input id="email" type="text" class="form-control" v-model="item.email" required />
    </div>

    <div class="mb-3">
      <label for="birthday">{{ $t("Birthday") }}</label>
      <input id="birthday" type="date" class="form-control" v-model="item.birthday" />
    </div>

    <div class="mb-3">
      <label for="sex">{{ $t("Sex") }}</label>
      <select id="sex" class="form-control" v-model="item.sex">
        <option value="M">{{ $t("Male") }}</option>
        <option value="F">{{ $t("Female") }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="licence">{{ $t("Licence") }}</label>
      <input id="licence" type="text" class="form-control" v-model="item.licence" />
    </div>

    <div class="mb-3">
      <label for="club">{{ $t("Club") }}</label>
      <select id="club" class="form-control" v-model="item.club">
        <option v-for="club in clubs" :key="club.id" :value="club.id">
          {{ club.name }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label for="role">{{ $t("Role")}}</label>
      <select id="role" class="form-control" v-model="item.role">
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ trans(getRoleNameById(role.id))}}
        </option>
      </select>
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-primary">{{ $t("Save") }}</button>
    </div>
  </form>
</template>

<script>
import form from "@/mixins/form";
import { mapGetters } from 'vuex'; 

export default {
  mixins: [form],
  props: {
    club_id: {
      type: Number,
      required: false,
    },
  },
  computed: {
    clubs() {
      return this.$store.state.clubs.clubs;
    },
    roles(){
      return this.$store.state.clubs.roles;
    }, 
    ...mapGetters('clubs', [
      'getRoleNameById'
    ])
  },
  data() {
    return {
      path: "/clubs/users/",
    };
  },
  methods: {},
};
</script>

<style></style>
