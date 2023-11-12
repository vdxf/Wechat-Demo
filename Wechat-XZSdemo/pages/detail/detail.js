// pages/detail/detail.js
import { formatNum, formatDate } from '../../utils/common.js';
import { reqNewsDetail, reqProDetail } from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        page: '',
        detailInfo: {},
        isFinished: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id: options.id,
            page: options.page
        })
        this.getDetail()
    },
    async getDetail() {
        this.setData({
            isFinished: false
        })
        let res = {}
        if (this.data.page === 'news') {
            //获取新闻详情
            const {data:data} = await reqNewsDetail({id: this.data.id})
            res = data
            res.data.view_count = formatNum(res.data.view_count)
            res.data.publish_date = formatDate(res.data.publish_date, 1)
        } else if (this.data.page === 'classify') {
            // 获取产品详情
            const {data:data} = await reqProDetail({id: this.data.id})
            res = data
        }
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.setData({
            detailInfo: res.data,
            isFinished: true
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: this.data.detailInfo.title,
            path: "/pages/detail/detail?id=" + this.data.detailInfo._id
        }
    },
    //分享到朋友圈
    onShareTimeline(){
        return {
            title: this.data.detailInfo.title,
            path: "/pages/detail/detail?id=" + this.data.detailInfo._id
        }
    }
})