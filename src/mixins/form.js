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
      this.init_item();
    }
  },
  methods: {
    init_item(){
      this.item = this.item_edit; 
    },
    add() {
      axios.post(this.path, this.item)
        .then(({ data }) => { 
          this.$emit('created', data); 
          this.item = {};
        })
        .catch(error => console.log(error.response && error.response.data));
    },
    update() {
      // use put instead of patch,  TypeError: update() got an unexpected keyword argument 'partial'
      axios.put(this.path + `${this.item.id}/`, this.item)
        .then(({ data }) => { this.$emit('updated', data); })
        .catch(error => console.log(error.response && error.response.data));
    },
  }
}