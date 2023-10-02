<template>
  <view>
    <view class="address-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="handleChooseAddress">请选择收货地址 + </button>
    </view>
    
    <view class="address-info" v-else @click="handleChooseAddress">
     <view class="row1">
        <view class="left">
          <text>收货人：{{address.userName}}</text>
        </view>
        <view class="right">
          <text>电话：{{address.telNumber}}</text>
          <uni-icons type="arrowright" size="14"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="address">收货地址：</view>
        <text>{{addStr}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations,mapGetters } from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
      };
    },
    methods: {
      ...mapMutations('m_user', ['updataAddress']),
      async handleChooseAddress(){
        const res = await wx.chooseAddress()
        if (res.errMsg === "chooseAddress:ok") {
          this.updataAddress(res)
        }
      }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addStr']),
    },
  }
</script>

<style lang="scss">
.address-box {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #5ccc2c;
}
.address-info {
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 5px solid #5ccc2c;
  font-size: 12px;
  .row1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .right {
      display: flex;
      align-items: center;
    }
  }
  .row2 {
     display: flex;
     align-items: center;
  }
}
</style>