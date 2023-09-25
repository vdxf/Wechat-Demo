// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // info: 'hello word',
        // imgSrc: 'http://www.itheima.com/images/logo.png',
        // randomNumber:Math.random() * 10,
        // number: Math.random().toFixed(2)
        // count: 0
        // sex: 0
        // show: true
        // arr1: ['1', '2', '3']
        // userList: [
        //     {id: 1, name: '小明'},
        //     {id: 2, name: '小红'},
        //     {id: 3, name: '小李'},
        // ]
    },
    // onBtnTap(e){
    //     console.log(e)
    // },
    // add(){
    //     this.setData({
    //         count: this.data.count + 1
    //     })
    // },
    // onChangeSex(){
    //     this.setData({
    //         sex: this.data.sex + 1
    //     })
    // },
    getInfo(){
        wx.request({
          url: 'https://www.escook.cn/api/get',
          method: 'GET', // "POST"
          data: {
              name: '张三',
              age: 18
          },
          success: (res) => {
              console.log('res => ', res)
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('在页面刚加载时请求数据')
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