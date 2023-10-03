<template>
  <view class="my-view">
    <my-login></my-login>
    <my-userinfo></my-userinfo>
  </view>
</template>

<script>
 import badgeMix from '@/mixins/tabbar-badge.js'
 export default {
   mixins: [badgeMix],
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.my-view {
}
</style>
