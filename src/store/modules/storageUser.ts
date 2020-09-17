import { sessionData } from '@/filters/storage'

export default {
  namespaced: true,
  state: {
    getSessionUserToken: '001',
    getSessionNavTabrsType: '',
    getSessionNavTabrsID: '',
  },
  getters: {
    getSessionUserToken: (state: any) => state.getSessionUserToken,
    getSessionNavTabrsType: (state: any) => state.getSessionNavTabrsType,
    getSessionNavTabrsID: (state: any) => state.getSessionNavTabrsID,
  },
  mutations: {
    // 导航ID
    SET_sessionNavTabrsType(state: any, context: any) {
      state.getSessionNavTabrsType = context
      sessionData('set', 'getSessionNavTabrsType', context)
    },
    SET_sessionUserToken(state: any, userToken: any) {
      state.getSessionUserToken = userToken
      sessionData('set', 'getSessionUserToken', userToken)
    },
    SET_sessionNavTabrsID(state: any, context: any) {
      state.getSessionNavTabrsID = context
      sessionData('set', 'getSessionNavTabrsID', context)
    },
  },
  actions: {},
}