import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

export default {
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
  },
  all(list) {
    return new Promise((resolve, reject) => {
      axios
        .all(list)
        .then(
          axios.spread((...res) => {
            resolve(res)
          })
        )
        .catch(err => {
          reject(err)
        })
    })
  }
}
