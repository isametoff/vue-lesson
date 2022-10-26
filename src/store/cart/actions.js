import * as cartApi from '@/api/cart.js';

export default {
  async load({ commit }) {
    let oldToken = localStorage.getItem('cartToken');
    let response = await cartApi.load(oldToken);
    if (response.res) {
      let { cart, token, needUpdate } = response.data;

      if (needUpdate) {
        localStorage.setItem('cartToken', token);
      }

      commit('setToken', { token });
      commit('setCart', { cart });
    }
  },
  async add({ state, getters, commit }, { id }) {
    if (getters.canAdd(id)) {
      commit('startProccess', id);

      let response = await cartApi.add(state.token, id);
      response.res
        ? (commit('add', { id }), commit('endProccess', id))
        : commit('endProccess', id);
    }
  },
  async removeProsess({ commit }, { id }) {
    commit('endProccess', id);
  },
  async remove({ state, getters, commit }, { id }) {
    if (getters.canUpdate(id)) {
      commit('startProccess', id);
      let res = await cartApi.remove(state.token, id);

      if (res) {
        commit('remove', { ind: getters.index(id) });
        commit('endProccess', id);
      }
      setTimeout(commit('endProccess', { id: id }), 10000);
    }
  },
  async setCnt(
    { state, getters, commit, dispatch, rootState, rootGetters },
    { id, cnt }
  ) {
    if (getters.canUpdate(id)) {
      commit('startProccess', id);
      let response = await cartApi.count(state.token, id, cnt);
      if (response.res) {
        let item = getters.productsDetailed.find(
          (product) => product.id === id
        );
        cnt < 1
          ? commit('remove', { ind: getters.index(id) })
          : item.rest >= cnt
          ? commit('setCnt', { id: id, cnt: cnt })
          : '';
        commit('endProccess', id);
      } else {
        commit('endProccess', id);
      }
    }
  },
};

/*

async add({ state, getters, commit, dispatch }, { id }){
		if(getters.canAdd(id)){
			commit('startProccess', id);

			try{
				let res = await cartApi.add(state.token, id)
					
				if(res === true){
					commit('add', { id });		
				}	
			}
			catch(e){
				dispatch('alerts/add', { 
					text: 'Ошибка ответа сервера при добавлении товара' 
				}, { root: true });
			}
			finally{
				commit('endProccess', id);
			}
		}
	}

*/
