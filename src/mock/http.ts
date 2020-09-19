import axios from "axios"
import { Toast } from "vant"

axios.defaults.baseURL = ""
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭 vant.Toast('提示');
 */
const tip = (msg: string) => {
  Toast({
    message: msg,
    duration: 3000,
    forbidClick: true
  })
}

// 请求拦截器
axios.interceptors.request.use(config => {

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  
  return response
}, error => {
  // console.log(error)
  const status = error.response.status
  if (error && error.response) {
    switch (status) {
      case 400:
        tip("小主~ 我们请求出错")
        break
      case 401:
        tip("系统提示：您未登录")
        return
      case 403:
        tip("登录过期，请重新登录")
        break
      case 404:
        tip("系统提示：请求资源未找到")
        break
      case 500:
        tip("系统提示：服务端出错")
        break
    }
    return status >= 200 && status < 300
  } else {
    tip("小主~ 网络开小差，稍后再试")
  }
  return Promise.reject(error.response)
})

export default {
  get(url: any, param: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: param
      })
      .then(res => {
        resolve(res)
      })
      .catch(res => {
        reject(res)
      })
    }).catch((e) => { })
  },
  post(url: any, param: any) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param
      })
      .then(res => {
        resolve(res)
      })
      .catch(res => {
        reject(res)
      })
    }).catch((e) => { })
  }
}