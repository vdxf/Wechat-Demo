// pages/classify/classify.js
import { reqNavData, reqproList } from '../../api/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navActive: 0,
        isLoading: true,
        finished: false,
        total: 0,
        navList: [],
        ProList: [],
        query: {
            navid: '',
            limit: 4,
            size: 0,
            keyword: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        await this.getNavList()
        if (options.index) {
            let { index } = options
            this.setData({
                navActive: Number(index),
            })
            this.changeNav(index)
        }
        this.getProList()
    },
    async getNavList(){
        const {data:res} = await reqNavData()
        this.setData({
            navList: res.data,
            'query.navid': res.data[0]._id
        })
    },
    async getProList(){
        this.setData({
            isLoading: false
        })
        const { data:res } = await reqproList(this.data.query)
        this.setData({
            total: res.total,
            ProList: this.data.query.size > 0 ? [...this.data.ProList, ...res.data ] : res.data,
            isLoading: true
        })
    },
    changeNav(e){
        const index = e?.detail?.index ?? e
        const id = this.data.navList[index]._id
        this.setData({
            'query.navid': id,
            'query.size': 0,
            total: 0,
            isLoading:false,
            finished: false,
        })
        this.getProList()
    },
    onPullDownRefresh() {

    },
    onReachBottom() {
        if(this.data.query.limit + this.data.query.size >= this.data.total) {
            this.setData({
                finished: true
            })
            return
        }
        if(!this.data.isLoading)return
        this.setData({
            'query.size': this.data.query.size + 4
        })
        this.getProList()
    },
})