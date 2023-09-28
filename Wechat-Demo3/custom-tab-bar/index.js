// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'
Component({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            sum: 'sum',
            active: 'activeTabBarIndex'
        },
        actions: {
            updataActive: 'updataActiveTabBarIndex'
        }
    },
    observers: {
        'sum': function(val){
            // console.log(val);
            this.setData({
                'list[1].info': val
            })
        }
    },
    options: {
        styleIsolation: 'shared'
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [{
            "pagePath":  "/pages/home/home",
            "text": "首页",
            "iconPath": "/images/home.jpg",
            "selectedIconPath": "/images/home-active.jpg"
        },
        {
          "pagePath":  "/pages/message/message",
          "text": "消息",
          "iconPath": "/images/message.jpg",
          "selectedIconPath": "/images/message-active.jpg",
          info: 2
      },
      {
          "pagePath": "/pages/contact/contact",
          "text": "联系我们",
          "iconPath": "/images/contact.jpg",
          "selectedIconPath": "/images/contact-active.jpg"
      }
    ]
    },
 
    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            // event.detail 的值为当前选中项的索引
            // this.setData({ active: event.detail });
            this.updataActive(event.detail)
            wx.switchTab({
              url: this.data.list[event.detail].pagePath,
            })
          },
    }
})