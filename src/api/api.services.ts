import axios from 'axios'

import axiosRetry from 'axios-retry'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)

axiosRetry(instance, { retries: 5, retryDelay: axiosRetry.exponentialDelay })

const api = () => instance

export default api
