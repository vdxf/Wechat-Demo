  import { mapGetters,mapMutations } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        handler(nv){
          if (nv === 0) {
            uni.removeTabBarBadge({
              index: 2,
              text: ''
            })
          }
          this.setBadge()
        },
        immediate: true
      },
    },
    onShow() {
      this.setBadge()
    },
    methods: {
      setBadge(){
        if (this.total > 0) {
          uni.setTabBarBadge({
            index: 2,
            text: this.total + ''
          })
        }
      }
    }
  }