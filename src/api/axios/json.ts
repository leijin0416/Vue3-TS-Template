// 主入口
// eslint-disable-next-line no-unused-vars
export function getRealJsonData (baseStr: string) {
    if (!baseStr || typeof baseStr !== 'string') return
    var jsonData = null
    try {
      jsonData = JSON.parse(baseStr)
    } catch (err) {
      return null
    }
    var needReplaceStrs: any[] = []
  
    loopFindArrOrObj(jsonData, needReplaceStrs)
    needReplaceStrs.forEach(function (replaceInfo) {
      // eslint-disable-next-line no-eval
      var matchArr = baseStr.match(eval('/"' + replaceInfo.key + '":[0-9]{15,}/'))
      if (matchArr) {
        var str = matchArr[0]
        var replaceStr = str.replace('"' + replaceInfo.key + '":', '"' + replaceInfo.key + '":"')
        replaceStr += '"'
        baseStr = baseStr.replace(str, replaceStr)
      }
    })
    var returnJson = null
    try {
      returnJson = JSON.parse(baseStr)
    } catch (err) {
      return null
    }
    return returnJson
  }
  
  // 遍历对象类型的
  function getNeedRpStrByObj(obj: any, needReplaceStrs: any) {
    for (var key in obj) {
      var value = obj[key]
      if (typeof value === 'number' && value > 9007199254740992) {
        needReplaceStrs.push({
          key: key
        })
      }
      loopFindArrOrObj(value, needReplaceStrs)
    }
  }
  
  // 遍历数组类型的
  function getNeedRpStrByArr(arr: any, needReplaceStrs: any) {
    for (var i = 0; i < arr.length; i++) {
      var value = arr[i]
      loopFindArrOrObj(value, needReplaceStrs)
    }
  }
  
  // 递归遍历
  function loopFindArrOrObj(value: any, needRpStrArr: any) {
    var valueTypeof = Object.prototype.toString.call(value)
    if (valueTypeof === '[object Object]') {
      needRpStrArr.concat(getNeedRpStrByObj(value, needRpStrArr))
    }
    if (valueTypeof === '[object Array]') {
      needRpStrArr.concat(getNeedRpStrByArr(value, needRpStrArr))
    }
  }
  