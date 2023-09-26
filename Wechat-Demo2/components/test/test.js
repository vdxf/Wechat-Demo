// components/test/test.js
Component({
    options: {
        styleIsolation: 'shared',
        pureDataPattern: /^_/
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // 第一种方式：简化的方式
        // max: Number
        // 第二种方式：完整的定义方式
        max: {
            type: Number,
            value: 10
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        count: 0,
        n1: 0,
        n2: 0,
        sum: 0,
        _rgb: {
            r: 0,
            g: 0,
            b: 0
        },
        fullColor: '0, 0, 0'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addCount(){
            if (this.data.count >= this.properties.max) {
                return
            }
            this.setData({
                count: this.data.count + 1,
                max: this.properties.max + 1
            })
            this. _showCount()
        },
        _showCount(){
            wx.showToast({
              title: 'count的值是' + this.data.count,
              icon: 'none'
            })
        },
        showInfo(){
            console.log(this.data)
            console.log(this.properties)
        },
        addN1(){
            this.setData({
                n1: this.data.n1 + 1
            })
        },
        addN2(){
            this.setData({
                n2: this.data.n2 + 1
            })
        },
        changeR(){
            this.setData({
                '_rgb.r': this.data._rgb.r + 5 > 255 ? 255 : this.data._rgb.r + 5
            })
        },
        changeG(){
            this.setData({
                '_rgb.g': this.data._rgb.g + 5 > 255 ? 255 : this.data._rgb.g + 5
            })
        },
        changeB(){
            this.setData({
                '_rgb.b': this.data._rgb.b + 5 > 255 ? 255 : this.data._rgb.b + 5
            })
        },
    },
    observers: {
        'n1, n2': function(newN1, newN2) {
            this.setData({
                sum: newN1 + newN2
            })
        },
        // '_rgb.r, _rgb.g, _rgb.b': function(newR, newG, newB){
        //     this.setData({
        //         fullColor: `${newR}, ${newG}, ${newB}`
        //     })
        // }
        '_rgb.**': function(obj) {
            this.setData({
                fullColor: `${obj.r}, ${obj.g}, ${obj.b}`
            })
        }
    }
})