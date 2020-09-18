/**
 *  localStorage 操作
 *  @param {any} method       get获取，set存入或覆盖，clean清除
 *  @param {any} name         localStorage 名称
 *  @param {any} obj          存入的内容，可以是任意类型
 *  
 *  @param {*} localData('set', 'localeCut', val);  -调用方式
 */
const localData = function (method: string, name: string, obj: any) {
  /*
    * 参数说明：
    * localStorage.getItem(key):    获取指定key本地存储的值
    * localStorage.setItem(key,value)： 将value存储到key字段
    * localStorage.removeItem(key): 删除指定key本地存储的值
    * */
  switch (method) {
    case 'get':
      if (localStorage.getItem(name + '_str')) {
        return localStorage.getItem(name + '_str')

      } else if (localStorage.getItem(name + '_str')) {
        return localStorage.getItem(name + '_str')
          
      } else {
        return null
      }
    case 'set':
      // localData('clean', name);
      if (typeof obj == 'object') {
        localStorage.setItem(name + '_obj', JSON.stringify(obj))
      } else {
        localStorage.setItem(name + '_str', obj)
      }
      return true
    case 'clean':
      window.localStorage.removeItem(name + '_obj')
      window.localStorage.removeItem(name + '_str')
      return true
  }
}

/**
 *  sessionStorage 操作
 *  @param {any} method       get获取，set存入或覆盖，clean清除
 *  @param {any} name         session 名称
 *  @param {any} obj          存入的内容，可以是任意类型
 *  
 *  @param {*} sessionData('set', 'localeCut', val);  -调用方式
 */
const sessionData = function (method: string, name: string, obj: any) {
  switch (method) {
    case 'get':
      if (sessionStorage.getItem(name + '_str')) {
        return sessionStorage.getItem(name + '_str')

      } else if (sessionStorage.getItem(name + '_str')) {
        return sessionStorage.getItem(name + '_str')

      } else {
        return null
      }
    case 'set':
      // sessionData('clean', name)
      if (typeof obj == 'object') {
        sessionStorage.setItem(name + '_obj', JSON.stringify(obj))
      } else {
        sessionStorage.setItem(name + '_str', obj)
      }
      return true
    case 'clean':
      window.sessionStorage.removeItem(name + '_obj')
      window.sessionStorage.removeItem(name + '_str')
      return true
  }
}

export { localData, sessionData }
