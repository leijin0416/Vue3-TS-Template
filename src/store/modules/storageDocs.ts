import { webDocsGetAreaStat, webDocsGetTimelineService, webDocsGetIndexRumorList, webDocsGetWikiList } from "@/mock/docs"
import { sessionData } from "@/filters/storage"

export default {
  namespaced: true,
  state: {
    getSessionDocsAreaStat: [],
    getSessionDocsTimelineService: [],
    getSessionDocsIndexRumorList: [],
    getSessionDocsWikiList: [],
  },
  getters: {
    getSessionDocsAreaStat: (state: any) => state.getSessionDocsAreaStat,
    getSessionDocsTimelineService: (state: any) => state.getSessionDocsTimelineService,
    getSessionDocsIndexRumorList: (state: any) => state.getSessionDocsIndexRumorList,
    getSessionDocsWikiList: (state: any) => state.getSessionDocsWikiList,
  },
  actions: {
    // 获取省份信息
    async updateDocsAreaStat(ctx: any, context: any) {
      const data: any = await webDocsGetAreaStat(context)
      ctx.commit('SET_sessionDocsAreaStat', data.data[0])
      // console.log(data)
    },
    // 实时资讯
    async updateDocsTimelineService(ctx: any) {
      const data: any = await webDocsGetTimelineService()
      ctx.commit('SET_sessionDocsTimelineService', data.data)
    },
    // 最新辟谣
    async updateDocsIndexRumorList(ctx: any) {
      const data: any = await webDocsGetIndexRumorList()
      ctx.commit('SET_sessionDocsIndexRumorList', data.data)
      // console.log(data)
    },
    // 知识百科
    async updateDocsWikiList(ctx: any) {
      const data: any = await webDocsGetWikiList()
      ctx.commit('SET_sessionDocsWikiList', data.data.result)
      // console.log(data)
    },
  },
  mutations: {
    SET_sessionDocsAreaStat(state: any, context: any) {
      state.getSessionDocsAreaStat = context
    },
    SET_sessionDocsTimelineService(state: any, context: any) {
      state.getSessionDocsTimelineService = context
    },
    SET_sessionDocsIndexRumorList(state: any, context: any) {
      state.getSessionDocsIndexRumorList = context
    },
    SET_sessionDocsWikiList(state: any, context: any) {
      state.getSessionDocsWikiList = context
    },
  },
}