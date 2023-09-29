<template>
  <view class="my-search-container" :style="{'backgroundColor': bgColor}" @click="handleSearch">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="18"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      bgColor: {
        type: String,
        default: '#ff0533'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      handleSearch(){
        this.$emit('gotoSearch')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    flex: 1;
    height: 36px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>