export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
  }),
  mutations: {
    updataAddress(state, address){
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updataUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(){
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    }
  },
  getters: {
    addStr(state){
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}