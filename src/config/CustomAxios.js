import axios from 'axios'
import { getCookies } from '../cookie/Cookie'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookies('Authorization'),
    Refresh: getCookies('Refresh'),
  },
})
