import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookies = (name, value, options) => {
  return cookies.set(name, value, { ...options })
}

export const getCookies = (name) => {
  return cookies.get(name)
}

export const removeCookie = (name) => {
  return cookies.remove(name)
}

export const setTokenAtCookies = (accessToken, refreshToken) => {
  cookies.set('Authorization', accessToken.Authorization, {
    secure: true,
    maxAge: 3600, // 1hour
  })
  cookies.set('Refresh', refreshToken.Refresh, {
    secure: true,
    maxAge: 1209600, //2 week
  })
}
