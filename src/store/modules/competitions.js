import axios from "axios";

const module = {
  namespaced: true, 
  state:{
    levels: [],     
    groups: []
  }, 
  mutations:{
    levelsMutation(state, payload){
      state.levels = payload; 
    }, 
    groupsMutation(state, payload){
      state.groups = payload; 
    }
  }, 
  actions:{
    async fetchLevelsAction({ commit }){
      return new Promise((resolve, reject) => {
        axios.get('/competitions/levels/all').then(({ data }) => {
          commit("levelsMutation", data); 
          resolve(data); 
        })
        .catch(error => {
          reject(error); 
        }); 
      })
    }, 
    async fetchGroupsAction({ commit }){
      return new Promise((resolve, reject) => {
        axios.get('/competitions/groups/all').then(({ data }) => {
          commit("groupsMutation", data); 
          resolve(data); 
        })
        .catch(error => {
          reject(error); 
        }); 
      })
    }
  }, 
  getters:{
    getLevelNameById: (state) => (id) => {
      const item = state.levels.find(elem => elem.id == id); 
      if (item) return item.name; 
    }, 
    getGroupNameById: (state) => (id) => {
      const item = state.groups.find(elem => elem.id == id); 
      if (item) return item.name; 
    }
  }
}

export default module