<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" placeholder="请输入搜索内容" :radius="100" cancelButton="none" v-model="searchValue"></uni-search-bar>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchValue: '',
      };
    },
    methods: {
      input(e){
        this.searchValue = e
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 3;
}
.uni-searchbar {
  background-color: #ff1010;
}
</style>
