<template>
  <view>
    <view class="goods-item">
      <view class="goods-item-left">
        <img :src="item.goods_small_logo || defaultImg">
      </view>
      <view class="goods-item-right">
        <text>{{item.goods_name}}</text>
        <view class="goods-info">￥{{item.goods_price | tofixed}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      item: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        defaultImg: '../../static/tab_icons/null.jpg',
      };
    },
    filters: {
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
 .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #ccc;
  }
.goods-item-left {
  margin-right: 5px;
  img {
    width: 100px;
    height: 100px;
    display: block;
  }
}
.goods-item-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .goods-info {
    font-size: 13px;
    color: #f11111;
  }
}
</style>