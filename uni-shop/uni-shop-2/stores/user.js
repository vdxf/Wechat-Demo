export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    redirectInfo: null
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
    saveUserInfoToStorage(state){
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    updataToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    },
  },
  getters: {
    addStr(state){
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}