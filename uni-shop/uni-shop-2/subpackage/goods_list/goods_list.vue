<template>
  <view class="goods-list">
    <view v-for="(item, i) in goodsList" :key="i" @click="handleGoodsDetail(item)">
      <my-goods :item="item"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false,
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      //获取商品列表数据
      async getGoodsList(callback){
        this.isLoading = true
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        callback && callback()
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        } 
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      handleGoodsDetail(item){
        uni.navigateTo({
          url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.queryObj.total) {
        return uni.$showMsg('数据加载完毕')
      }
      if (this.isLoading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh(){
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
  }
</script>

<style lang="scss">
 
</style>
