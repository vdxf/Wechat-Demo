<template>
  <view v-if="goodsInfo.goods_name" class="goods-container">
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
    
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    
    <view class="goods-nav">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        handler(newVal){
          const findResult = this.options.find(item => {
            return item.text === '购物车'
          })
          if (findResult) {
            findResult.info = newVal
          }
        },
        immediate: true
      }
    },
    data() {
      return {
        goodsInfo: {},
        options: [{
          icon: 'shop',
          text: '店铺',
        },{      
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },{
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods:{
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail(id){
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        res.message.goods_introduce = res.message.goods_introduce.replace(/webp/g, 'jpg')
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
      onClick(e){
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e){
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goodsInfo.goods_id,
            goods_name: this.goodsInfo.goods_name,
            goods_price: this.goodsInfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsInfo.goods_small_logo,
            goods_state: true,
          }
          this.addToCart(goods)
        }
      }
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
.goods-container {
  padding-bottom: 50px;
}
.goods-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
