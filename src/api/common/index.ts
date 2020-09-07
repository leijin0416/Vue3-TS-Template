/**
 * 请求统一管理 
 */
import Request from '@/api/axios/http'

/**
 * 短信区号
 * @param {*} params 
 */
export const webGetSelectAreaCode = (params: any) => Request.post('/api/areaCode/selectAreaCode', params);