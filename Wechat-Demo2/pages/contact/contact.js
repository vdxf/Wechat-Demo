// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        count: 0,
        colorList: [],
        row: 10,
        isloading: false
    },
    add(){
        this.setData({
            count: this.data.count + 1
        })
    },
    getColors(){
        this.setData({
            isloading: true
        })
        wx.showLoading({
          title: '数据加载中',
        })
        let {row , colorList} = this.data
        let ColorCharacter = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
        for(let i = 0; i < row; i++){
            let HomeNumber = "#"
            for(let j = 0; j < 6; j++){
                const NumberRand = Math.floor(Math.random() * 16)
                HomeNumber += ColorCharacter[NumberRand]
            }
            colorList[i] = HomeNumber
        }
        setTimeout(() => {
            this.setData({
                colorList: colorList,
                isloading: false
            })
            wx.hideLoading()
        },1000)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getColors()
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
        this.setData({
            count: 0,
            row: 10,
            colorList: []
        })
        this.getColors()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
       if (this.data.isloading) {
           return
       } else {
            this.setData({
                row : this.data.row + 10
            })
            this.getColors()
       }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})