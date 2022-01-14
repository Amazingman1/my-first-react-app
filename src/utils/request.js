import axios from 'axios'
import { getToken, getUsername } from '@/utils/cookies'
import { message } from 'antd'

const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 1000,
})
service.interceptors.request.use(
  config => {
    config.headers['Token'] = getToken()
    config.headers['Username'] = getUsername()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const { data } = response
    if(data.resCode !==  0 ){
      message.error(data.message)
      // return Promise.reject(new Error(data.message || 'Error'))
    }
    return data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service