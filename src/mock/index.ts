/**
 * 请求统一管理
 */
import requestMock from "./http"

/**
 * 新闻
 * @param {*} params 
 */
export const webGetInewNewsPages = (params: any) => requestMock.get("/inew/news/get", params)
/**
 * 新闻Title
 * @param {*} params 
 */
export const webGetInewNewsChannel = (params: any) => requestMock.get("/inew/news/channel", params)