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
        const [err, success] = await uni.chooseAddress().catch(err => err)
        if (err === null && success.errMsg === "chooseAddress:ok") {
          this.updataAddress(success)
        }
        //用户没有授权
        if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
          this.reAuth()
        }
      },
      //让用户重新授权
      async reAuth(){
        const [err, confirmResult] = await uni.showModal({
          content: '您没有打开地址权限，是否打开地址权限',
          confirmText: "确认",
          cancelText: "取消"
        })
        if (err) return
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        if (confirmResult.confirm) return uni.openSetting({
          success(res) {
            if (res.authSetting['scope.address']) return uni.$showMsg('授权成功，请选择地址')
            if (!res.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权!')
          }
        })
      },
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