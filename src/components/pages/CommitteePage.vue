<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div class="card m-2" style="width: 200px" v-for="member in committee" :key="member.id">
      <img :src="asset(member.image)" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ trans(member.title) }}</h5>
        <div class="card-text">
          {{ member.user.first_name }}
          {{ member.user.last_name }}<br />
          <a :href="mailto(member.email)">Email</a>
          <div v-if="member.user.contact.phone">{{ member.user.contact.phone }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("clubs/fetchCommitteeAction", { subject_type: "Association" });
  },
  computed: {
    committee() {
      return this.$store.state.clubs.committee;
    },
  },
  methods:{
    mailto(email){
      return `mailto:${email}`; 
    }
  }
};
</script>

<style></style>
