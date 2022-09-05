import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    userName:null,
    auth:null,
    counter: 0
  }
  
  ),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    login({commit},userName){
      commit("login",userName)
    },
    logout(){
      doubleCount(this.state)
      console.log(this.state)
    }

  }

  
})
