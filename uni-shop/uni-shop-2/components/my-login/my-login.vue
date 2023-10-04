<template>
  <view class="login-view">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="login-btn" @click="getUserProfile">一键登录</button>
    <text>登录后尽享更多权益</text>
  </view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  export default {
    name:"my-login",
    computed: {
      ...mapState('m_user', ['redirectInfo']),
    },
    data() {
      return {
      };
    },
    methods: {
       ...mapMutations('m_user', ['updataUserInfo', 'updataToken', 'updataRedirectInfo']),
      getUserProfile(){
        uni.getUserProfile({
          desc: '你的授权信息',
          success: (res) => {
            this.updataUserInfo(res.userInfo)
            this.getToken(res)
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权')
          }
        })
      },
      async getToken(info){
        // wx.checkSession({
        // success(res) { // 登录状态有效回调
        // console.log('登录状态有效回调 ', res);
        //  },
        // fail(res) {  // 登录状态失效回调
        // console.log('登录状态失效回调 ', res);
        // }
        // })
        const [err, res] = await uni.login().catch(err => err)
        if ( err || res.errMsg !== 'login:ok') {
          return uni.$showMsg('登录失败！')
        }
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        const { data: loginRes } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // if (loginRes .meta.status !== 200){
        //   return uni.$showMsg('登录失败！')
        // }
        const fade = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        this.updataToken(fade)
        this.navigateBack()
      },
      navigateBack(){
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
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