// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
swiperList: [
    {imgUrl: "/images/slider01.jpg"},
    {imgUrl: "/images/slider02.jpg"},
    {imgUrl: "/images/slider03.jpg"},
    {imgUrl: "/images/slider04.jpg"},
    {imgUrl: "/images/slider05.jpg"},
    {imgUrl: "/images/slider06.jpg"},
    {imgUrl: "/images/slider07.jpg"},
],
gridList: [
    {imgUrl: "/images/desktop_2.jpg"},
    {imgUrl: "/images/desktop_3.jpg"},
    {imgUrl: "/images/desktop_4.jpg"},
    {imgUrl: "/images/desktop_5.jpg"},
    {imgUrl: "/images/desktop_6.jpg"},
    {imgUrl: "/images/desktop_7.jpg"},
    {imgUrl: "/images/desktop_8.jpg"},
    {imgUrl: "/images/desktop_9.jpg"},
    {imgUrl: "/images/desktop_10.jpg"},
]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.getSwiperList()
    },
    // getSwiperList(){
    //     wx.request({
    //       url: 'https://www.escook.cn/slides',
    //       methods: 'GET',
    //       success: (res) => {
    //           console.log(res)
    //       }
    //     })
    // },
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