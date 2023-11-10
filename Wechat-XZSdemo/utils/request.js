import { withPromise } from "./withPromise"

const baseUrl = 'https://tea.qingnian8.com/'

export const $request = (url, data = {}, options = {}) => {
    return data ? withPromise(wx.request, { 
        url: baseUrl + url,
        method: options.method,
        header: {
          "Content-Type": "application/json"
        },
        data,
      }) : withPromise(wx.request, { 
        url: baseUrl + url,
        method: options.method,
        header: {
          "Content-Type": "application/json"
        },
      })
}

