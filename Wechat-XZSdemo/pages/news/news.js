// pages/news/news.js
import { formatNum, formatDate } from '../../utils/common.js';
import { reqNewsData } from '../../api/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsArr: [],
        query:{
            limit: 8,
            size: 0
        },
        total: 0,
        isLoading: false,
        finished: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getNewsData()
    },
    async getNewsData(){
        this.setData({
            isLoading: true
        })
        const query = this.data.query
        const { data: res } = await reqNewsData(query)
        res.data.forEach(item => {
            item.view_count = formatNum(item.view_count)
            item.publish_date = formatDate(item.publish_date, 5)
        })
        this.setData({
            newsArr: this.data.query.size > 0 ? [...this.data.newsArr, ...res.data] : res.data,
            total: res.total,
            isLoading: true
        })
      },
    onPullDownRefresh() {
        this.setData({
            'query.size': 0
        })
        this.getNewsData()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.data.query.limit + this.data.query.size >= this.data.total) {
            this.setData({
                finished: true
            })
            return
        }
        if(!this.data.isLoading)return
        this.setData({
            'query.size': this.data.query.size + 8
        })
        this.getNewsData()
    },
})