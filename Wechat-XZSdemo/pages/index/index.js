// index.js
import { formatNum, formatDate } from '../../utils/common.js';
import { reqNavData, reqNewsData } from '../../api/index.js'
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navArr: [],
    newsArr: [],
    query: {
      limit: 3
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData()
    this.getNewsData()
  },
  async getNavData(){
    const { data: res } = await reqNavData()
    this.setData({
        navArr: res.data
    })
  },
  async getNewsData(){
    const query = this.data.query
    const { data: res } = await reqNewsData(query)
    res.data.forEach(item => {
        item.view_count = formatNum(item.view_count)
        item.publish_date = formatDate(item.publish_date, 5)
    })
    this.setData({
        newsArr: res.data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})