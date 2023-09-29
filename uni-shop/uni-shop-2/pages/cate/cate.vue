<template>
  <view>
    <!-- <my-search :bgColor="'#000000'" :radius="3"></my-search> -->
    <my-search @gotoSearch="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="left-scroll-view">
        <block v-for="(item, i) in cateList" :key="i">
          <view @click="handleActive(i)" :class="['left-item', i === active ? 'active' : '']">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
          <view class="cate-lv2-title">/{{item.cat_name}}/</view>
          <view class="cate-lv2-list">
            <view class="cate-lv2-item" v-for="(item3, i3) in item.children" :key="i3" @click="gotoGoodsList(item3)">
              <img :src="item3.cat_icon">
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //当前设备可使用高度
        wh: 0,
        //分类列表数据
        cateList: [],
        active: 0,
        //二级分类列表
        cateLevel2: [],
        //重置滚动条
        scrollTop: 0,
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {data: res} = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.cateList = res.message
        //为二级分类赋值
        this.cateLevel2 = res.message[0].children
      },
      handleActive(i){
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item3){
        uni.navigateTo({
          url: '/subpackage/goods_list/goods_list?cid=' + item3.cat_id
        })
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
.scroll-view-container {
  display: flex;
}
.left-scroll-view {
  width: 120px;
  display: flex;
  flex-direction: column;
}
.left-item {
  background-color: #f1f1f1;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  &.active {
    background-color: #fff;
    position: relative;
    &::before {
      content: '';
      width: 2px;
      height: 30px;
      background-color: #ff0815;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 15px 0;
}
.cate-lv2-list {
  display: flex;
  flex-wrap: wrap;
  .cate-lv2-item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 60px;
      height:60px;
    }
    text {
      font-size: 12px
    }
  }
}
</style>
