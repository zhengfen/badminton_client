const module = {
  namespaced: true, 
  state:{
    sidebarActive: false
  }, 
  mutations:{
    toggleSidebarMutation(state){
      state.sidebarActive = !state.sidebarActive; 
    }
  }
}

export default module