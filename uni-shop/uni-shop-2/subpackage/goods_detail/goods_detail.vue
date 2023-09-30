<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
        <img :src="item.pics_big_url" @click="preview(i)">
      </swiper-item>
    </swiper>
    <!-- 商品详细信息 -->
    <view class="goods-info-box">
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <view class="content">
        <view class="name">{{goodsInfo.goods_name}}</view>
        <view class="collect">
          <uni-icons type="star" size="16" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="freight">
        <text>快递免运费</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo: {},
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods:{
      async getGoodsDetail(id){
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.goodsInfo = res.message
      },
      preview(i){
        uni.previewImage({
          current: i,
          urls:this.goodsInfo.pics.map(item => {
            return item.pics_big
          }),
        })
      },
    },
  }
</script>

<style lang="stylus">
swiper {
    height: 750rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
.goods-info-box {
  padding: 10px;
  padding-right: 0;
}
.price {
  color: red;
  font-size: 18px;
  margin: 10px 0;
}
.content {
  display: flex;
  justify-content: space-between;
  .name {
    font-size: 12px;
    margin-right: 10px;
  }
  .collect {
    width: 120px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #ccc;
    color: #ccc;
  }
}
.freight {
  font-size: 12px;
  color: #ccc;
  margin: 10px 0;
}
</style>
