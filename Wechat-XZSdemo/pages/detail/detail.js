// pages/detail/detail.js
import { formatNum, formatDate } from '../../utils/common.js';
import { reqNewsDetail } from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        detailInfo: {},
        isFinished: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id: options.id
        })
        this.getDetail()
    },
    async getDetail() {
        this.setData({
            isFinished: false
        })
        const {data:res} = await reqNewsDetail({id: this.data.id})
        res.data.view_count = formatNum(res.data.view_count)
        res.data.publish_date = formatDate(res.data.publish_date, 1)
        console.log('res => ', res);
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