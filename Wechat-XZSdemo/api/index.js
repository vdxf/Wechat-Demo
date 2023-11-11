import { $request } from "../utils/request"
import { withLoading } from "../utils/withLoading"
//获取导航列表
export const reqNavData = withLoading(() => {
  return $request('nav/get', { method: 'POST' })
})
//获取新闻列表
export const reqNewsData = withLoading((data) => {
  return $request('news/get', data, { method: 'post' })
})
//获取产品详情
export const reqNewsDetail = withLoading((data) => {
    return $request('news/detail', data, { method: 'post' })
})