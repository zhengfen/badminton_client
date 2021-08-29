import axios from 'axios'

const module = {
  namespaced: true, 
  state:{
    pages: [],     
  }, 
  mutations:{
    pagesMutation(state, payload){
      state.pages = payload; 
    }
  }, 
  actions:{
    async fetchPagesAction({ commit }){
      return new Promise((resolve, reject) => {
        axios.get('/cms/pages/all').then(({ data }) => {
          commit("pagesMutation", data); 
          resolve(data); 
        })
        .catch(error => {
          reject(error); 
        }); 
      })
    }, 
  }, 
  getters:{
    getPageById: (state) => (id) => {
      const item = state.pages.find(elem => elem.id == id); 
      if (item) return item; 
    }
  }
}

export default module