import { $request } from "../utils/request"
import { withLoading } from "../utils/withLoading"

export const reqNavData = withLoading(() => {
  return $request('nav/get', { method: 'POST' })
})

export const reqNewsData = withLoading((data) => {
  return $request('news/get', data, { method: 'post' })
})