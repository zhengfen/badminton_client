export default {
  data() {
    return {
      pathname: window.location.pathname,
      windowWidth: window.innerWidth,
      small: window.innerWidth < 768,
      development: process.env.NODE_ENV === 'development'      
    };
  }, 
}