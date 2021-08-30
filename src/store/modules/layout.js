const module = {
  namespaced: true, 
  state:{
    /* admin */
    adminSidebarActive: false, 
    /* app */
    showScreenOverlay: false,
    leftNavValue :'-350px',
    rightNavValue :'-350px',
  }, 
  mutations:{
    toggleAdminSidebarMutation(state){
      state.adminSidebarActive = !state.adminSidebarActive; 
    }, 
    openLeftNav(state){
      state.leftNavValue = '0px';
      state.showScreenOverlay = true; 
    },
    closeLeftNav(state){
      state.leftNavValue = '-350px';
      state.showScreenOverlay = false; 
    },
    openRightNav(state){
      state.rightNavValue = '0px';
      state.showScreenOverlay = true; 
    },
    closeRightNav(state){
      state.rightNavValue = '-350px';
      state.showScreenOverlay = false; 
    },
    closeNav(state){
      state.leftNavValue = '-350px';
      state.rightNavValue = '-350px';
      state.showScreenOverlay = false; 
    }, 
  }
}

export default module