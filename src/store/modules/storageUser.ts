import { sessionData } from '@/filters/storage'

export default {
  namespaced: true,
  state: {
    getSessionUserToken: '001',
    getSessionNavTabrsID: '',
  },
  getters: {
    getSessionUserToken: (state: any) => state.getSessionUserToken,
    getSessionNavTabrsID: (state: any) => state.getSessionNavTabrsID,
  },
  mutations: {
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