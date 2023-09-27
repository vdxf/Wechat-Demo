// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: 'wszs',
        country: 'CHINA'
    },
    async getInfo3(){
        const res = await wx.p.request({
            method: 'GET',
            url: 'https://applet-base-api-t.itheima.net/api/get',
            data: {
                name: 'wangwu',
                age: 22
            }
          })
          console.log(res)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    gotoInfo1(){
        wx.navigateTo({
          url: '/pages/info/info',
        })
    },
    gotoInfo2(){
        wx.navigateTo({
          url: '/pages/info/info?name=李四&age=20',
        })
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