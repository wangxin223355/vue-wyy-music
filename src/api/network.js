/*
 * @Description: axios封装
 * @Autor: wangxin
 * @Date: 2020-05-29 09:14:57
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-29 19:10:55
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

export default {
  /**
   * @description: get请求
   * @param {String} path 请求路径
   * @param {Object} data 请求参数
   * @return: {Promise} 返回请求数据
   */
  get(path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(path, { params: data })
        .then(function(response) {
          resolve(response.data)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  /**
   * @description: post请求
   * @param {String} path 请求路径
   * @param {Object} data 请求参数
   * @return: {Promise} 返回请求数据
   */
  post(path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(path, { data })
        .then(function(response) {
          resolve(response.data)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  }
}
