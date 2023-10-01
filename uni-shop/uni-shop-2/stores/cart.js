export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state, goods){
      const findResult = state.cart.find((item) => {
        return item.goods_id === goods.goods_id
      })
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updataRadio(state, options){
      const findResult = state.cart.find(item => {
        return item.goods_id === options.goods_id
      })
      if (findResult) {
        findResult.goods_state = options.goods_state
      }
      this.commit('m_cart/saveToStorage')
    },
    updataNum(state, options){
      const findResult = state.cart.find(item => {
        return item.goods_id === options.goods_id
      })
      if (findResult) {
        findResult.goods_count = options.goods_count
      }
      this.commit('m_cart/saveToStorage')
    },
    removsGoods(state,goods_id){
      state.cart = state.cart.filter(item => {
        return item.goods_id !== goods_id
      })
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    total(state){
      let c = 0
      state.cart.forEach(item => {
        return c += item.goods_count
      })
      return c
    }
  }
}