<template>
  <view>
    <view class="goods-item">
      <view class="goods-item-left">
        <radio :checked="item.goods_state" color="#ff1010" v-if="showRadio" @click="handleChangeCheck(item)"></radio>
        <img :src="item.goods_small_logo || defaultImg">
      </view>
      <view class="goods-item-right">
        <text>{{item.goods_name}}</text>
        <view class="goods-info">
          <view class="price">￥{{item.goods_price | tofixed}}</view>
          <uni-number-box :min="1" :value="item.goods_count" background="#ff1010" color="#fff" v-if="showNum" @change="numChange"></uni-number-box>
        </view>
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
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        defaultImg: '../../static/tab_icons/null.jpg',
      };
    },
    methods: {
      handleChangeCheck(item){
        this.$emit('handleChangeCheck', {
          goods_id: item.goods_id,
          goods_state: !item.goods_state
        })
      },
      numChange(e){
        this.$emit('numChange', {
          goods_id: this.item.goods_id,
          goods_count: +e
        })
      },
    },
    filters: {
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
  }
</script>

<style lang="scss">
 .goods-item {
  width: 750rpx; 
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #ccc;
}
.goods-item-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
  img {
    width: 100px;
    height: 100px;
    display: block;
  }
}
.goods-item-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  text {
    font-size: 13px;
  }
} 
.goods-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
    font-size: 16px;
    color: #f11111;
  }
</style>