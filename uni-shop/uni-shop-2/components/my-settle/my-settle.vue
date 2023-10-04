<template>
  <view class="settle-box">
    <label class="radio" @click="changeAllState">
      <radio color="#ff1010" :checked="isAllChecked"/><text>全选</text>
    </label>
    <view class="amount-box">
      合计: <text>￥{{totalPrice}}</text>
    </view>
    <view class="settle-btn" @click="handleSettle">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import { mapGetters,mapState,mapMutations } from 'vuex' 
  export default {
    name:"my-settle",
    computed:{
      ...mapGetters('m_cart', ['checkCount', 'total', 'totalPrice']),
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      isAllChecked(){
        return this.total === this.checkCount
      }
    },
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateRedirectInfo']),
      ...mapMutations('m_cart', ['updataAllRadio']),
      changeAllState(){
        this.updataAllRadio(!this.isAllChecked)
      },
      handleSettle(){
        // 1. 先判断是否勾选了要结算的商品
          if (!this.checkCount) return uni.$showMsg('请选择要结算的商品！')
          // 2. 再判断用户是否选择了收货地址
          if (!this.addStr) return uni.$showMsg('请选择收货地址！')
          // 3. 最后判断用户是否登录了，如果没有登录，则调用 delayNavigate() 进行倒计时的导航跳转
          if (!this.token) return this.delayNavigate()
          this.payOrder()
      },
      // 展示倒计时的提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算！' + n,
          mask: true,
          duration: 1500
        })
      },
      // 延迟导航到 my 页面
      delayNavigate() {
        this.seconds = 3
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      async payOrder(){
        const orderInfo = {
          order_price: 0.01,
          consignee_addr: this.addStr,
          goods: this.cart.filter(item => item.goods_state).map(item => ({
            goods_id: item.goods_id, 
            goods_number: item.goods_count, 
            goods_price: item.goods_price,
          }))
        }
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if (res.meta.status !== 200) {
          return uni.$showMsg('创建订单失败')
        }
        const orderNumber = res.message.order_number
        const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {order_number: orderNumber})
        if (res2.meta.status !== 200){
          return uni.$showMsg('订单生成失败！')
        }
        const payInfo = res2.message.pay
         const result = await uni.requestPayment(payInfo)
         console.log('result => ', result);
        const [err, success] = await uni.requestPayment(payInfo)
        if (err) {
          return uni.$showMsg('订单未支付！1')
        }
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {order_number: orderNumber})
        if (res3.meta.status !== 200){
          return uni.$showMsg('订单未支付！2')
        }
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
      },
    }
  }
</script>

<style lang="scss">
.settle-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
.radio {
  font-weight: bold;
  display: flex;
  align-items: center;
}
.amount-box {
  text {
    color: #f11010;
  }
}
.settle-btn {
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f11010;
  color: #fff;
  border-radius: 10px;
}

</style>