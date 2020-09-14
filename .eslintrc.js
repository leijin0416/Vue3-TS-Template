/**
 *  eslintrc配置文件修改
 *  https://www.lovean.com/view-10-338507-0.html
 */
module.exports = {
  root: true,
  parserOptions: {
    "parser": "@typescript-eslint/parser",
    "project": "./tsconfig.json",
    "extraFileExtensions": [".vue"],
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "experimentalObjectRestSpread": true,//启用对对象的扩展
      "jsx": true,                       //启用jsx语法
      "globalReturn":true,               //允许return在全局使用
      "impliedStrict":true               //启用严格校验模式
    }
  },
  env: {
    "browser":true,               //启用浏览器全局变量。
    "node":true,                  //Node.js全局变量和Node.js范围。
    "commonjs":true,              //CommonJS全局变量和CommonJS范围。
    "shared-node-browser":true,  //Node和Browser共同的全局。
    "es6" :ture,                      // 启用ES6的功能。
    "worker" :true ,                   //网络工作者全局变量。
    "amd" :true,                      //根据amd规范定义require()和define()作为全局变量。
    "mocha":true,                         //添加所有的摩卡测试全局变量。
    "jasmine":true,                       //添加1.3和2.0版本的所有Jasmine测试全局变量。
    "jest":true,                          //Jest全局变量。
    "phantomjs":true,                     //PhantomJS全局变量。
    "protractor":true,                    //量角器全局变量。
    "qunit":true,                         // QUnit全局变量。
    "jquery":true,                        //jQuery全局变量。
    "prototypejs":true,                   //Prototype.js全局变量。
    "shelljs":true,                       //ShellJS全局变量。
    "meteor":true,                        //流星全球变量。
    "mongo":true,                         // MongoDB全局变量。
    "applescript":true,                   //AppleScript全局变量。
    "nashorn":true,                       // Java 8 Nashorn全局变量。
    "serviceworker":true,                 // 服务工作者全局变量。
    "atomtest":true,                      // Atom测试助手全局变量
    "embertest":true,                     // Ember测试助手全局变量。
    "webextensions":true,                 // WebExtensions全局变量
    "greasemonkey":true                   // GreaseMonkey全局变量
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".eslintrc"]
      },
      "webpack": {
        "config": {
          "resolve": {
            "alias": {
              "src": "src"
            }
          }
        }
      },
    }
  },
  plugins: [
    "vue",
    "babel",
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:vue/base",
    "typescript",
    "standard"
  ],
  rules: {
    "func-names": 0,
    "one-var": [1, "never"],
    "prefer-const": 1,
    "no-unused-expressions": 1,
    "new-cap": 2,
    "prefer-arrow-callback": 2,
    "arrow-body-style": 0,
    "max-len": [
      1,
      {
      "code": 200,
      "ignoreStrings": true,
      "ignoreUrls": true,
      "ignoreRegExpLiterals": true
      }
    ],
    "consistent-return": "off",
    "default-case": 2,
    "prefer-rest-params": 2,
    "no-script-url": 0,
    "no-console": [
      2,
      {
      "allow": ["info", "error", "warn", "log"]
      }
    ],
    "no-duplicate-imports": 2,
    "newline-per-chained-call": 2,
    "no-underscore-dangle": 2,
    "eol-last": 2,
    "no-useless-rename": 2,
    "class-methods-use-this": 0,
    "prefer-destructuring": 0,
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "no-plusplus": 0,
    "import/prefer-default-export": 0,
    "import/no-dynamic-require": 2,
    "@typescript-eslint/no-var-requires": 2,
    "no-use-before-define": [
      "error",
      {
      "functions": false
      }
    ],
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "no-invalid-this": 0,
    "babel/no-invalid-this": 2,
    "no-await-in-loop": "off",
    "array-callback-return": "off",
    "no-restricted-syntax": "off",
    "@typescript-eslint/no-explicit-any": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "no-param-reassign": [
      2,
      {
      "props": false
      }
    ],
    "generator-star-spacing": "off",
    "indent": [2, 4, {
      "SwitchCase": 1
    }],
    "eqeqeq": 0,
    "no-else-return": 2,
    "arrow-parens": 0,
    "space-before-function-paren": ["error", "never"],
    "comma-dangle": [2, "never"],
    "semi": [2, "always"],
    "vue/no-parsing-error": [2, { 'x-invalid-end-tag': false }], // end标签
    "no-irregular-whitespace": "off" // 禁止掉空格报错检查
  }
}