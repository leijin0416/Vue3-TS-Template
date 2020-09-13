import { createStore } from "vuex"
import sessionDataStore from './modules/index'

let modules = {
  ...sessionDataStore,
};

export default createStore({
  state: {
    testStatus: 10,
  },
  modules,
})
