import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003'

const apiClient = axios.create({
  baseURL: BACKEND_URL,
})

export default apiClient
