export default {
  data() {
    return {
      items: [],
      item_edit: {},
      id_delete: null,
      index_delete: null,
      // pagination
      count: undefined,
      next: undefined,
      previous: undefined,
      limit: 20,  // default 
      search_input: '',
      // modal
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    next_tick_fetch(page) {
      this.$nextTick(() => {
        this.fetch(page);
      })
    },
    fetch(page) {
      axios.get(this.url(page)).then(({ data }) => {
        this.items = data.results;
        console.log(this.items); 
        this.count = data.count;
        this.next = data.next;
        this.previous = data.previous;
        // pagination
        if (this.next && this.next.match(/limit=(\d+)/)) this.limit = parseInt(this.next.match(/limit=(\d+)/)[1]);
        else if (this.previous && this.previous.match(/limit=(\d+)/)) this.limit = parseInt(this.previous.match(/limit=(\d+)/)[1]);
        else { this.limit = 20 }
      })
    },
    // offset is decided by page and limit
    url(page) {
      if (!page) {
        let query = location.search.match(/page=(\d+)/);
        page = query ? query[1] : 1;
      }
      const offset = (page - 1) * this.limit;
      let url = this.path + `?limit=${this.limit}&offset=${offset}`;
      if (this.search_input.length > 0) url += `&search=${this.search_input}`;
      return url;
    },
    // add 
    add_item(newItem) {
      this.items.unshift(newItem);
      this.showAddModel = false;
    },
    // edit
    show_edit_modal(item) {
      this.item_edit = item;
      this.showEditModal = true;
    },
    update_item() {
      this.showEditModal = false;
    },
    // delete
    show_delete_modal(item, index) {
      this.id_delete = item.id;
      this.index_delete = index;
      this.showDeleteModal = true;
    },
    delete_item() {
      if (this.id_delete) {
        axios.delete(this.path + '/' + this.id_delete).then(({ data }) => {
          console.log(data);
          this.items.splice(this.index_delete, 1);
          this.id_delete = null;
          this.index_delete = null;
          this.showDeleteModal = false;
        }).catch(error => console.log(error.response && error.response.data));
      }
    }
  }
}