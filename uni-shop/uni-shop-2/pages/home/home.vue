<template>
  <view>
    <view class="search-box">
      <my-search @gotoSearch="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="`/subpackage/goods_detail/goods_detail?goods_id=` + item.goods_id">
          <img :src="item.image_src">
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandle(item)">
        <img :src="item.image_src">
      </view>
    </view>
    <!-- 楼层数据 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <view class="floor-title">
          <img :src="item.floor_title.image_src">
        </view>
        <view class="product-list">
          <navigator class="left-box" :url="item.product_list[0].url">
            <img :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix">
          </navigator>
          <view class="right-box">
            <navigator :url="item2.url" class="right-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <img :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix">
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js' 
  export default {
    mixins: [badgeMix],
    data() {
      return {
        //轮播图数据
        swiperList: [],
        //分类导航的数据列表
        navList: [],
        //楼层数据
        floorList: [],
      };
    },
    onLoad() {
      //获取轮播图数据
      this.getSwiperList()
      //获取分类导航数据
      this.getNavList()
       //获取楼层数据
       this.getFloorList()
    },
    methods: {
      async getSwiperList(){
        const { data:res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message
        uni.$showMsg('数据请求成功！')
      },
      async getNavList(){
        const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.navList = res.message
      },
      async getFloorList(){
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        res.message.forEach((item) => {
          item.product_list.forEach(prod => {
            prod.url = '/subpackage/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      navClickHandle(item){
        if(item.name === '分类') {
          uni.switchTab({
            url: "/pages/cate/cate"
          })
        }
      },
      gotoSearch(){
        uni.navigateTo({
          url: '/subpackage/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 2;
}
swiper {
  height: 330rpx;
  .swiper-item, img {
      width: 100%;
      height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-item {
    img {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
.floor-title {
  img {
    width: 100%;
    height: 60rpx;
  }
}
.product-list {
  display: flex;
  padding-left: 10rpx;
  .right-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
