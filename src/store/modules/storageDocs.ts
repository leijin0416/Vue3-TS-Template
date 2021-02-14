import { webDocsGetAreaStat, webDocsGetTimelineService } from "@/mock/docs"
import { sessionData } from "@/filters/storage"

export default {
  namespaced: true,
  state: {
    getSessionDocsAreaStat: [],
    getSessionDocsTimelineService: [],
  },
  getters: {
    getSessionDocsAreaStat: (state: any) => state.getSessionDocsAreaStat,
    getSessionDocsTimelineService: (state: any) => state.getSessionDocsTimelineService,
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
      // console.log(data.data)
    }
  },
  mutations: {
    SET_sessionDocsAreaStat(state: any, context: any) {
      state.getSessionDocsAreaStat = context
    },
    SET_sessionDocsTimelineService(state: any, context: any) {
      state.getSessionDocsTimelineService = context
    },
  },
}