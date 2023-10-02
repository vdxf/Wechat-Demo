import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/stores/cart.js'
import moduleUser from '@/stores/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'm_cart': moduleCart,
    'm_user': moduleUser
  }
})

export default store