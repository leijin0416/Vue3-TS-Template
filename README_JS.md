# Vite

## 参考链接

```js
'https://github.com/leevare?tab=repositories'
'https://www.leevii.com/2020/09'                leevii

'https://dsx2016.com/?cat=5'                    大师兄
```

### JavaScript filter() 方法

filter： 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
filter： 返回true表示保留该元素（通过测试），false则不保留。

### JavaScript Array some() 方法

some()： 方法用于检测数组中的元素是否满足指定条件。
some()： 当内部return true时跳出整个循环。所以如果有一个元素满足条件，返回true , 剩余的元素不会再执行检测。

```js
let dom = document.getElementById("value");
let a = [1,2,3,4,5,6,7,8,9];
let data = 0;
let data1 = 0;
let str = [];

data = a.some((val,index) => {
    data1 += val;
    str.push(`The value is ${val} and the index is ${index}`);
    return val>7;
}, data1);
str.push(`The data is ${data}`);
str.push(`The data1 is ${data1}`);
```

![效果图](https://img-blog.csdnimg.cn/20200831155833861.bmp)

### JavaScript includes() 方法

includes()： 方法用于判断字符串是否包含指定的子字符串。
includes()： 如果找到匹配的字符串则返回 true，否则返回 false。区分大小写。

```js
// toUpperCase()
var str = "Hello world, welcome to the Runoob。";
var n = str.includes("world");
```

### JavaScript replace() 方法

replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

```js
/** 正则：
 * /(\d+)岁/g  -/g是全局匹配（img）
 *             -i 忽略大小写 ， m 多行模式 ， g 全局模式
 *             -\D:类似[^0-9] 非数字
 *
 * "^\d+$"　　 -非负整数（正整数 + 0）
 */
var str="他今年22岁，她今年20岁，他的爸爸今年45岁，她的爸爸今年44岁，一共有4人";
var newstr = str.replace(/(\d+)岁/g, function(m, n) {
  console.log(arguments);
  var year = new Date().getYear()+1-parseInt(m);
  return m+"("+year+"年出生)";
});
console.log(newstr) // 他今年22岁(97年出生)，她今年20岁(99年出生)，他的爸爸今年45岁(74年出生)，她的爸爸今年44岁(75年出生)，一共有4人
```

2
