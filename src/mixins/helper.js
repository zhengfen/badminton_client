import { mapGetters } from "vuex";
var slugify = require('slugify')

export default {
  data() {
    return {
      pathname: window.location.pathname,
      windowWidth: window.innerWidth,
      small: window.innerWidth < 768,
      development: process.env.NODE_ENV === 'development', 
      server: location.hostname == 'localhost' ? 'http://localhost:3000' : 'http://localhost:3000'       
    };
  }, 
  computed: {
    authUser() {
      return this.$store.state.auth.authUser;
    },
    // getters from vuex Auth
    ...mapGetters('auth', ["signedIn", "authUserId", "isAdmin"]),
  },
  methods: {
    trans(value, locale){
      if (! value) return; 
      if (typeof value ==='string') return value; 
      const lo = locale ? locale: this.$i18n.locale; 
      let translated = value[lo]; // this.$i18n.locale
      if (typeof translated ==='string' ) return translated; 
      for (const lo of this.$i18n.availableLocales) {
        let translated = value[lo]; // this.$i18n.locale
        if (typeof translated === 'string' && translated.length > 0) return translated;
      }
      return '';
    },
    slug(str){
      return slugify(str.toLowerCase());
    }, 
    slug_trans(value, locale){
      const str = this.trans(value, locale); 
      return this.slug(str); 
    },
    dateDisplay(date) {
      if (date) return moment(date, 'YYYY-MM-DD h:mm:ss').format('DD.MM.YYYY');
    },  
    timeDisplay(date) {
      if (date) return moment(date, 'YYYY-MM-DD h:mm:ss').format('hh:mm:ss');
    },
    dateTimeDisplay(date){
      if (date) return moment(date, 'YYYY-MM-DD h:mm:ss').format('DD.MM.YYYY hh:mm:ss');
    },
    goBack() {
      window.history.back();
    }, 
    // '/media/contacts/EbCtyVlXQAAbPNB.jpg'
    asset(path){
      if (path.includes('http')) return path; 
      return this.server + path;       
    }, 
    toFormData: function (obj) {
      var form_data = new FormData();
      for (var key in obj) {
        if (obj[key] !== null && key !== 'image') form_data.append(key, obj[key]);
      }
      return form_data;
    },
    updateAttribute(url, attribute, value) {
      axios.patch(url, {
        [attribute]: value
      });
    },
  }
}