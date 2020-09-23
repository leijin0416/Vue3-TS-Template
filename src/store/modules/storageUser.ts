import { sessionData } from "@/filters/storage"

export default {
  namespaced: true,
  state: {
    getSessionUserToken: "01",
    getSessionNavTabrsType: "",
    getSessionNavTabrsID: "",
  },
  getters: {
    getSessionUserToken: (state: any) => state.getSessionUserToken,
    getSessionNavTabrsType: (state: any) => state.getSessionNavTabrsType,
    getSessionNavTabrsID: (state: any) => state.getSessionNavTabrsID,
  },
  mutations: {
    // 底部导航切换ID
    SET_sessionNavTabrsType(state: any, context: any) {
      state.getSessionNavTabrsType = context
      sessionData("set", "getSessionNavTabrsType", context)
    },
    // 底部导航ID
    SET_sessionNavTabrsID(state: any, context: any) {
      state.getSessionNavTabrsID = context
      sessionData("set", "getSessionNavTabrsID", context)
    },
    SET_sessionUserToken(state: any, context: any) {
      state.getSessionUserToken = context
      sessionData("set", "getSessionUserToken", context)
    },
  },
  actions: {},
}