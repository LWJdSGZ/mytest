import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.resolve(error.response)
  }
)

function checkStatus(response) {
  //如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }

  //异常状态下，把错误信息返回去
  if (response && response.data && response.data.message) {
    alert(response.data.message)
  }
  return response
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: process.env.BASE_API,
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      baseURL: process.env.BASE_API,
      url,
      params, //get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    )
  }
}
