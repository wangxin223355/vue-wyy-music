/*
 * @Description:
 * @Autor: wangxin
 * @Date: 2020-05-28 12:49:58
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-11 22:28:28
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    'no-useless-escape': 'off'
  }
}
