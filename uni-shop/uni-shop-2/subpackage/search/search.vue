<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="input" placeholder="请输入搜索内容" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议 -->
    <view class="suggest-list" v-if="searchResult.length !== 0">
      <view class="suggest-item" v-for="(item, i) in searchResult" :key="i" @click="handleGoodsDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="handleClearHistory"></uni-icons>
      </view>
      <view class="history-content">
        <uni-tag :text="item" :inverted="true" v-for="(item, i) in histories" :key="i" @click="handleGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        kw: '',
        timer: null,
        searchResult: [],
        historyList: [],
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchResult()
        },500)
      },
      async getSearchResult(){
        if (!this.kw) {
          this.searchResult = []
          return
        }
        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.searchResult = res.message
        this.saveSearchHistory()
      },
      saveSearchHistory() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        //对搜索历史进行持久化存储
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      //跳转详情
      handleGoodsDetail(item){
        uni.navigateTo({
          url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      //点击历史记录跳转商品列表
      handleGoodsList(kw){
        uni.navigateTo({
          url: '/subpackage/goods_list/goods_list?query=' + kw
        })
      },
      //清空历史记录
      handleClearHistory(){
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      }
    },
    computed: {
      histories(){
        return [...this.historyList].reverse()
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
.suggest-list {
  padding: 0 5px;
}
.suggest-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
}
.goods-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history-box {
  padding: 5px 10px;
}
.history-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
}
.history-content {
  margin-top: 10px;
}
.uni-tag {
  margin: 5px ;
  background-color: red;
}
</style>
