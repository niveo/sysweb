import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:8080'
})
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('TOKEN')
    if (token) config.headers.Authorization = `Bearer ${token}`

    const empresa = localStorage.getItem('EMPRESA')
    if (empresa) config.headers.set('empresa', empresa)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  (config) => {
    console.log(config)

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default api
