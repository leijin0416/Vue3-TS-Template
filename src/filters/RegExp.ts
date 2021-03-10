/**
 * https://www.cnblogs.com/bert227/p/10260424.html  | https://www.cnblogs.com/baiyang2292/p/11166650.html
 * 
 * ( num * value ).toFixed(4); -四舍五入
 * parseFloat(this.otcList.sell_lave_count); -转换为数值
 * 
 * 特殊字符 -!RegExpZF.test(num)
 *
 **/
export const RegExpZF = /[`~!#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;

// 校验空格
export const RegExpSpace = /(^\s+)|(\s+$)|\s+/g;