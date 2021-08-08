import axios from "axios";

const module = {
  namespaced: true, 
  state:{
    clubs: [], 
    teams: [],     
  }, 
  mutations:{
    clubsMutation(state, payload){
      state.clubs = payload; 
    }, 
    teamsMutation(state, payload){
      state.teams = payload; 
    }
  }, 
  actions:{
    async fetchClubsAction({ commit }){
      return new Promise((resolve, reject) => {
        axios.get('/clubs/clubs/all').then(({ data }) => {
          commit("clubsMutation", data); 
          resolve(data); 
        })
        .catch(error => {
          reject(error); 
        }); 
      })
    }
  }, 
  getters:{
    getClubNameById: (state) => (id) => {
      const item = state.clubs.find(elem => elem.id == id); 
      if (item) return item.name; 
    }
  }
}

export default module