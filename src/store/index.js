import { createStore } from 'vuex';
import contract from './contract';
import web3 from '@/web3';

const store = createStore({
  state() {
    return {
      bottles: [],  // 存储所有茅台酒瓶子的信息
    };
  },
  mutations: {
    setBottles(state, bottles) {
      state.bottles = bottles;
    }
  },
  actions: {
    async createBottle({ dispatch }, description) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts found.");
      }
      await contract.methods.createBottle(description).send({ from: accounts[0], gas: '1000000' });

      await dispatch('fetchBottles');
    },
    async updateLogistics({ dispatch }, { id, status }) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts found.");
      }
      await contract.methods.updateLogistics(id.toString(), status).send({ from: accounts[0], gas: '1000000' });

      await dispatch('fetchBottles');
    },
    async fetchBottles({ commit }) {
      const total = await contract.methods.nextId().call();
      const bottles = [];
      for (let i = 1; i < total; i++) {
        const bottle = await contract.methods.getBottle(i).call();
        bottles.push({
          id: bottle[0],
          description: bottle[1],
          logistics: bottle[2].map(log => ({
            status: log.status,
            timestamp: Number(log.timestamp)
          }))
        });
      }
      commit('setBottles', bottles);
    }
  },
  getters: {
    getBottles: state => state.bottles
  }
});

export default store;