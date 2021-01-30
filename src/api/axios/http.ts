import axios from "axios"
import vant from "vant"
import router from "@/router/index"

import CryptoJS from "./cryptoJS"
import { getRealJsonData } from "./json"
import { sessionData } from "@/filters/storage"
// import qs from 'qs'

/**
 * 公共
 */
axios.defaults = {
  baseURL: " ",
  timeout: 5000,
  withCredentials: true
}
/**
 * 提示
 */
const tip = (msg: any) => {
  vant.Toast({
    message: msg,
    duration: 3000,
    forbidClick: true
  })
}
/**
 * 路由
 */
const toLogin = (name: any) => {
    router.push({ path: name })
}

axios.interceptors.request.use( config => {
  const token = sessionData("get", "getSessionToken", "")

  token && (config.headers.token = token)
  config.data = {
    data: CryptoJS.Encrypt(JSON.stringify(config.data))
  }

  return config
}, error => {

  return Promise.reject(error)
})

axios.interceptors.response.use( response => {
  response.data = getRealJsonData(CryptoJS.Decrypt(response.data.data))
  // console.log(response)

  if (response.data.code === 401) {
    tip("小主~ 登录过期，请重新登录")
    setTimeout(() => {
      // toLogin();
      window.location.reload()
    }, 1000)
  }
  
  return response
}, error => {
  const status = error.response.status
  // console.log(status);
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

/**
 *  请求方式
 *  qs.stringify(param)  -pageNum=1&pageSize=223
 */
export default {
  get(url: any) {
    return new Promise( (resolve, reject) => {
      axios({
        method: "get",
        url,
        params: ''
      })
      .then( res => {
        resolve(res)
      })
      .catch( res => {
        reject(res)
      })
    })
  },
  post(url: any, param: any) {
    return new Promise( (resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param
      })
      .then( res => {
        resolve(res)
      })
      .catch( res => {
        reject(res)
      })
    })
  }
}