import { observable, action } from 'mobx-miniprogram'

export const store = observable({
    // 数据字段
    numA: 1,
    numB: 2,
    activeTabBarIndex: 0,
    // 计算属性
    get sum() {
        return this.numA + this.numB
    },
    // action 方法，用来修改store中的数据
    updataNumA: action(function (step) {
        this.numA += step
    }),
    updataNumB: action(function (step) {
        this.numB += step
    }),
    updataActiveTabBarIndex: action(function (index) {
        this.activeTabBarIndex = index
    })
})