<template>
  <div class="autocomplete">
    <input
      type="text"
      v-model="search_input"
      :placeholder="$t('User')"
      v-on:keyup="search"
      :class="input_class"
    >
    <table
      class="table table-sm client-autocomplete bg-light"
      v-if="search_results.length"
    >
      <tr
        v-for="item in search_results"
        :key="item.id"
        @click="select_item(item)"
        class="pointer"
      >
        <td v-html="boldString(item.first_name, search_input)"></td>
        <td v-html="boldString(item.last_name, search_input)"></td>
        <td v-html="boldString(item.email, search_input)"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Object, 
    input_class:String
  },
  data() {
    return {
      search_input: this.modelValue? `${this.modelValue.first_name} ${this.modelValue.last_name} ${this.modelValue.email}`: '',
      search_results: [],
      selected_item: null
    }
  },
  methods: {
    search() {
      this.search_results = [];
      if (this.search_input.length > 2) {
        axios.get('/clubs/users/search',{ params: { search: this.search_input}}).then(({ data }) => {
          this.search_results = data;
        });
      }
      else {
        this.$emit('update:modelValue', null);
      }
    },

    select_item(item) {
      this.selected_item = item;
      this.search_input = this.present_item(item);
      this.search_results = [];
      this.$emit('update:modelValue', item)
    },

    present_item(item){
      if (!item) return '';
      return `${item.first_name} ${item.last_name} ${item.email}`;
    },

    boldString(str, find) {
      if (str !== null) {
        var re = new RegExp(find, 'gi');
        return str.replace(re, '<b>' + find + '</b>');
      }
    }
  }
}
</script>

<style>
</style>