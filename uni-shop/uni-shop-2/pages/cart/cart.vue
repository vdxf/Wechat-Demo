<template>
  <view>
    <my-address></my-address>
    <view class="cart-title">
      <uni-icons type="cart" size="18"></uni-icons>
      <text>购物车</text>
    </view>
    <uni-swipe-action>
      <block v-for="(item, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="onClick(item)" @change="change">
          <my-goods :item="item" :showRadio="true" :showNum="true" @numChange="numChange" @handleChangeCheck="handleChangeCheck"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js' 
  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options:[{
          text: '删除',
          style: {
            backgroundColor: '#dd524d',
            fontSize: '12px'
          }
        }]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updataRadio','updataNum', 'removsGoods']),
      handleChangeCheck(options){
        this.updataRadio(options)
      },
      numChange(options){
        this.updataNum(options)
      },
      onClick(item){
        this.removsGoods(item.goods_id)
      },
      change(e){
        console.log('当前状态：'+ e )
      },
    }
  }
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #ccc;
  text {
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
