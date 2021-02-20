/**
 * 请求统一管理 
 */
import requestMock from "./http"

/**
 * 列表
 * @param {*} params 省份
 * @param {*} currentConfirmedCount  现存确诊
 * @param {*} confirmedCount 累计确诊
 * @param {*} deadCount 死亡
 * @param {*} curedCount 治愈
 * @param {*} dangerAreas 风险区域
 */
export const webDocsGetAreaStat = (params: any) => requestMock.get('/docs/data/getAreaStat/'+ params)
/**
 * 按时间线获取实时资讯
 * @param params 
 */
export const webDocsGetTimelineService = () => requestMock.get('/docs/data/getTimelineService')
/**
 * 获取最新辟谣
 * @param params 
 */
export const webDocsGetIndexRumorList = () => requestMock.get('/docs/data/getIndexRumorList')