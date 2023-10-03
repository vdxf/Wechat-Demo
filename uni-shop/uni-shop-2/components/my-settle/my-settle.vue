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
      isAllChecked(){
        return this.total === this.checkCount
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updataAllRadio']),
      changeAllState(){
        this.updataAllRadio(!this.isAllChecked)
      },
      handleSettle(){
        //判断是否勾选了要结算的商品
        if (!this.checkCount) return uni.$showMsg('请选择要结算的商品')
        //判断用户是否选择了收货地址
        if (!this.addStr) return uni.$showMsg('请选择收货地址')
        //判断用户是否登录
        if (!this.token) return uni.$showMsg('请先登录')
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