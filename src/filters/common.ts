// 递归遍历
const TreeForeach = (tree: any, func: any) => {
  if (!tree || typeof tree !== 'object') return []
  tree.forEach((data: { children: any; }) => {
    if (typeof data.children === 'object') {
      TreeForeach(data.children, func)   // 函数调用函数自身
    } else {
      return func(data)                   // 递归出口
    }
  })
}

// 转换时间
const ParseTime = (timestamp: any) => {
  var date = new Date(timestamp)    // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds())

  let strDate = Y+M+D+h+m+s
  console.log(strDate) //2020-05-08 17:44:56　
  return strDate
}


export { TreeForeach, ParseTime };