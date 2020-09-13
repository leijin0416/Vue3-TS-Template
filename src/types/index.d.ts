/** 
 *  TypeScript 给第三方库添加声明文件；
 *  -目的是告诉 ts，先从 src/@types 目录下去搜索类型。 否则默认是直接去 node_modules 下面找；
 */
declare module 'crypto-js'
declare module 'vue-wechat-title'