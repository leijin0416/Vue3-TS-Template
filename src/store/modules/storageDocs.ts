import { webDocsGetAreaStat } from "@/mock/docs"
import { sessionData } from "@/filters/storage"

export default {
  namespaced: true,
  state: {
    getSessionDocsAreaStat: [],
  },
  getters: {
    getSessionDocsAreaStat: (state: any) => state.getSessionDocsAreaStat,
  },
  actions: {
    // 获取省份信息
    async updateDocsAreaStat(ctx: any, context: any) {
      const data: any = await webDocsGetAreaStat(context)
      ctx.commit('SET_sessionDocsAreaStat', data.data[0])
      // console.log(data)
    }
  },
  mutations: {
    SET_sessionDocsAreaStat(state: any, context: any) {
      state.getSessionDocsAreaStat = context
    },
  },
}