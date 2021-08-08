<template>
  <ul
    class="pagination"
    v-if="shouldPaginate"
  >
    <li
      v-show="previous"
      style="margin-right:3px;"
    >
      <a
        href="#"
        aria-label="Previous"
        rel="prev"
        @click.prevent="page=1"
        class="btn btn-info btn-sm"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      v-show="previous"
      style="margin-right:3px;"
    >
      <a
        href="#"
        aria-label="Previous"
        rel="prev"
        @click.prevent="page--"
        class="btn btn-info btn-sm"
      >
        ‹
      </a>
    </li>
    <li
      v-for="n in pageRange"
      :key="n"
      style="margin-right:3px;"
    >
      <span
        class="btn btn-default btn-sm"
        v-if="n=='...'"
      >...</span>
      <button
        aria-label="n"
        rel="n"
        @click="page=n"
        class="btn btn-info btn-sm"
        v-else
      >
        <span aria-hidden="true">{{n}}</span>
      </button>
    </li>
    <li v-show="next">
      <a
        href="#"
        aria-label="Next"
        rel="next"
        @click.prevent="page++"
        class="btn btn-info btn-sm"
      >
        ›
      </a>
    </li>
    <li v-show="next">
      <a
        href="#"
        aria-label="Last"
        rel="next"
        @click.prevent="page=last"
        class="btn btn-info btn-sm"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['count', 'next', 'previous', 'limit'],
  data() {
    return {
      page: location.search.match(/page=(\d+)/) ? parseInt(location.search.match(/page=(\d+)/)[1]) : 1,
      pageRange: [],
    }
  },
  watch: {
    next() {
      this.pageRange = this.pagination();
    },
    page() {
      this.broadcast();
      this.updateUrl(); 
    }
  },
  computed: {
    shouldPaginate() {
      return !!this.next || !!this.previous;
    },
    last(){
      if (this.limit > 0) return (Math.ceil(this.count/this.limit));
      return undefined;
    }, 
    current_page(){
      if (this.next){
        const offset = parseInt(this.next.match(/offset=(\d+)/)[1]);
        return offset/this.limit; 
      }
      return this.last;
    }
  },
  methods: {
    broadcast() {
      return this.$emit('page_changed', this.page);
    },
    updateUrl() {
      history.pushState(null, null, '?page=' + this.page);
    },
    pagination(c, m) {
      console.log(this.limit); 

      var current = this.current_page,
        last = this.last,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;
      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
          range.push(i);
        }
      }
      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }
      return rangeWithDots;
    }
  }
}
</script>
<style scoped>
.child-right {
  margin-left: auto;
}
</style>