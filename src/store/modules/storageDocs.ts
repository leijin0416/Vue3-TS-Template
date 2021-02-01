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
    async updateDocsAreaStat(ctx: any, context: any) {
      const data: any = await webDocsGetAreaStat(context)
      console.log(data)
      ctx.commit('SET_sessionDocsAreaStat', data)
    }
  },
  mutations: {
    SET_sessionDocsAreaStat(state: any, context: any) {
      state.getSessionDocsAreaStat = context
    },
  },
}