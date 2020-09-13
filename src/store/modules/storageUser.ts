import { sessionData } from '@/filters/storage'

export default {
  namespaced: true,
  state: {
    getSessionUserToken: '001',
  },
  getters: {
    getSessionUserToken: (state: any) => state.getSessionUserToken,
  },
  mutations: {
    SET_sessionUserToken(state: any, userToken: any) {
      state.getSessionUserToken = userToken
      sessionData('set', 'getSessionUserToken', userToken)
    },
  },
  actions: {},
}