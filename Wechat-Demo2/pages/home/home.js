// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        count: 0,
        swiperList: [],
        gridList: []
    },
    // 3. this.selectComponent
    getChild(){
        const child = this.selectComponent('.customA')
        // console.log(child)
        child.setData({
            count: child.properties.count + 1
        })
        child.addCount()
    },
    // 2. 事件绑定
    syncCount(e){
        // console.log('syncCount')
        // console.log(e.detail.value)
        this.setData({
            count: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSwiperList()
        this.getGridList()
    },
    getSwiperList(){
        wx.request({
          url: 'https://applet-base-api-t.itheima.net/slides',
          methods: 'GET',
          success: (res) => {
              this.setData({
                  swiperList: res.data
              })
          }
        })
    },
    getGridList(){
        wx.request({
          url: 'https://applet-base-api-t.itheima.net/categories',
          methods: 'GET',
          success: (res) => {
              this.setData({
                gridList: res.data
              })
          }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log('触发了下拉刷新事件')
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})