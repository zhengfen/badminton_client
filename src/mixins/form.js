export default {
  props: {
    mode: {
      type: String,
      default: 'new'
    },
    item_edit: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      item: {},
      path: '/clubs/clubs/',
    }
  },
  created() {
    if (this.mode == 'edit') {
      this.item = this.item_edit;
    }
  },
  methods: {
    add() {
      axios.post(this.path, this.item)
        .then(({ data }) => { 
          this.$emit('created', data); 
          this.item = {};
        })
        .catch(error => console.log(error.response && error.response.data));
    },
    update() {
      axios.patch(this.path + `${this.item.id}/`, this.item)
        .then(({ data }) => { this.$emit('updated', data); })
        .catch(error => console.log(error.response && error.response.data));
    },
  }
}