import axios from 'axios'
import Login from './loginutil'
const readFile = false // 读取json文件标识

export const getDataByFile = (config) => {
  return new Promise((resolve, reject) => {
    const url = config.url
    const start = url.lastIndexOf('/') + 1
    const end = url.length
    const fileName = url.substring(start, end)
    const filePath = '../../static/mock/' + fileName + '.json'

    axios.get(filePath).then(
      (res) => {
        // if (config.successFn) {
        //     config.successFn(res.data);
        // } else {
        resolve(res.data)
        // }
      }
    ).catch(
      (err) => {
        if (config.errorFn) {
          config.errorFn(err)
        } else {
          reject(err)
        }
      }
    )
  })
}

// 在创建实例时设置配置默认值
const instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 6000
})

// 数据序列化
// instance.defaults.transformRequest = [function (data) {
//     // return data;
//     return qs.stringify(data);
// }];

/**
 * http request 拦截器
 * 根据变量readFile判断是否通过读取json文件获取数据
 * 若是，则读取json文件后取消后台服务请求
 */
instance.interceptors.request.use(
  (req) => {
    if (readFile) {
      getDataByFile(req)
    }
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 返回状态判断
instance.interceptors.response.use(
  (res) => {
    if (!res.data.success) {
      return Promise.reject(res)
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

function errorHandler(res, errorFn) {
  if (errorFn) {
    errorFn(res)
  } else {
    let msg = ''
    if (res.response) {
      msg = res.response.data.message
    } else {
      if (res.status && res.status === 200) {
        msg = res.data.msg
      } else {
        msg = res.message
      }
    }
    alert(msg)
  }
}

async function apiAxios(method, url, params, config) {
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: process.env.BASE_API,
    timeout: 6000,
    withCredentials: false
  }).then((res) => {
    if (res.status && res.status === 200) {
      config.successFn(res.data)
    } else {
      errorHandler(res, config.errorFn)
    }
  }).catch((err) => {
    errorHandler(err, config.errorFn)
  })
}

export default {
  get(url, params, config) {
    return apiAxios('GET', url, params, config)
  },

  post(url, params, config) {
    return apiAxios('POST', url, params, config)
  },

  put(url, params, config) {
    return apiAxios('PUT', url, params, config)
  },

  delete(url, params, config) {
    return apiAxios('DELETE', url, params, config)
  },
  errorHandler
}
