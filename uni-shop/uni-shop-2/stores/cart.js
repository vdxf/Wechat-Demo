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
    updataAllRadio(state, checked){
      state.cart.forEach(item => {
        return item.goods_state = checked
      })
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
      return state.cart.reduce((total, item) => {
        return total += item.goods_count
      },0)
    },
    checkCount(state){
      const resArr = state.cart.filter(item => item.goods_state)
      return resArr.reduce((total, item) => {
        return total += item.goods_count
      },0)
    },
    totalPrice(state){
      const resArr = state.cart.filter(item => item.goods_state)
      return resArr.reduce((total, item) => {
        return total += item.goods_price * item.goods_count
      },0).toFixed(2)
    }
  }
}