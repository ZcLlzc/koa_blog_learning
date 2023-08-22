// 请求
import http from '@/utils/http'
// 类型
import { loginType, regiType } from '@/types/index'
// 路径前缀
const basePath = ''

// 登录
export const login = (data: loginType) => http.post(`${basePath}login`, data)
// 注册
export const register = (data: regiType) => http.post(`${basePath}register`, data)
