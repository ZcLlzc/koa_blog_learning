import http from '@/utils/http'

const basePath = 'user/'

// 登出
export const logout = () => http.post(`${basePath}logout`)
