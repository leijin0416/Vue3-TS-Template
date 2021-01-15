/**
 * 请求统一管理 
 */
import requestMock from "./http"

/**
 * 列表
 * @param {*} params
 */
export const webGetSelectAreaCode = (params: any) => requestMock.get('/newbee/index-infos')