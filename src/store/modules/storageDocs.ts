import { webDocsGetAreaStat, webDocsGetTimelineService, webDocsGetIndexRumorList } from "@/mock/docs"
import { sessionData } from "@/filters/storage"

export default {
  namespaced: true,
  state: {
    getSessionDocsAreaStat: [],
    getSessionDocsTimelineService: [],
    getSessionDocsIndexRumorList: [],
  },
  getters: {
    getSessionDocsAreaStat: (state: any) => state.getSessionDocsAreaStat,
    getSessionDocsTimelineService: (state: any) => state.getSessionDocsTimelineService,
    getSessionDocsIndexRumorList: (state: any) => state.getSessionDocsIndexRumorList,
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
  },
}