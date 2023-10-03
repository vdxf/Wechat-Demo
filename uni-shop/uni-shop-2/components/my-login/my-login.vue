<template>
  <view class="login-view">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <text>登录后尽享更多权益</text>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updataUserInfo']),
      getUserInfo(e){
        if (e.detail.errMsg === "getUserInfo: fall auth deny") {
          return uni.$showMsg('您取消了授权')
        }
        this.updataUserInfo(e.detail.userInfo)
      },
    }
  }
</script>

<style lang="scss">
.login-view {
  background-color: #f1f1f1;
  height: 750rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 40px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(50%);
    border-radius: 100%;
  }
  button {
    width: 90%;
    background-color: #ff1010;
    color: #fff;
    border-radius: 100px;
    margin: 15px 0;
  }
  text {
    font-size: 12px;
    color: #666;
  }
}
</style>