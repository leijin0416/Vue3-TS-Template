module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  /* 
   下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
    http://eslint.cn/docs/rules/no-unused-vars
  */
  rules: {
    "space-before-function-paren": 0,  // 函数定义时括号前面要不要有空格
    "eol-last": 0,  // 文件以单一的换行符结束
    "no-extra-semi": 0, // 可以多余的冒号
    "semi": 0,  // 语句可以不需要分号结尾
    "eqeqeq": 0, // 必须使用全等
    "one-var": 0, // 连续声明
    "no-undef": 0, // 可以 有未定义的变量

    "generator-star-spacing": [2, "both"], // 生成器函数前后空格
    "no-tabs": 0,
    "no-unused-vars": 0,  // 禁止未使用过的变量,直接禁用变量声明但未使用的提示
    "no-irregular-whitespace": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时禁止debugger
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时禁止console
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0, // 打包时禁止console
    /**
     * ES6相关规则
     */
    "arrow-parens": [2, 'as-needed'], // 要求箭头函数的参数使用圆括号
  }
};
