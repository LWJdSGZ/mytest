// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // 关闭语句强制分号结尾
    'semi': [0],

    //对象字面量项尾不能有逗号
    'comma-dangle': [2, 'never'],

    //可以有空格
    'no-multi-spaces': 0,

    //注释中可以有空格
    'spaced-comment': 0,

    // allow non-import statements appearing before import statements
    'import/first': 0,

    //require()设置
    'global-require': 0,
    'import/no-dynamic-require': 0,

    //不统一换行符
    'linebreak-style': 0,

    // 强制一行的最大长度
    'max-len': [2, {'code': 200}],

    // 关闭html结束标签验证
    'vue/html-self-closing': 0,
    'vue/no-parsing-error': [2, {'x-invalid-end-tag': false}],

    //可以拼接字符串
    'prefer-template': 0,

    //参数可以再赋值
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,

    //箭头函数的风格
    'arrow-body-style': [2, 'always'],

    //强制对象字面量缩写语法
    "object-shorthand": 0,

    //禁止else语句内只有if语句
    "no-lonely-if": 0,

    //循环中允许使用++
    "no-plusplus": [2, {"allowForLoopAfterthoughts": true}],

    //可以使用alert
    "no-alert": 0,

    "guard-for-in": 0,

    "no-restricted-syntax": 0,

    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],

    //允许参数重新复制
    'no-param-reassign': 0,

    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
// https://eslint.org/docs/user-guide/configuring
