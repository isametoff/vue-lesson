import * as cartApi from '@/api/cart.js';

export default {
  async load({ commit, dispatch }) {
    try {
      let savedToken = localStorage.getItem('cartToken');
      const { cart, token, needUpdate } = await cartApi.load(savedToken);
      if (needUpdate) {
        localStorage.setItem('cartToken', token);
      }

      commit('setToken', { token });
      commit('setCart', { cart });
    } catch (e) {
      dispatch(
        'alerts/add',
        {
          name: 'load',
          text: 'Ошибка сервера',
          update: true,
        },
        { root: true }
      );
    }
  },
  async add({ state, getters, commit, dispatch, rootGetters }, { id }) {
    if (getters.canAdd(id)) {
      try {
        commit('startProccess', id);

        let res = await cartApi.add(state.token, id);

        if (res === true) {
          commit('add', { id });
        }

        commit('endProccess', id);
      } catch (e) {
        dispatch(
          'alerts/add',
          {
            name: 'cartAdd',
            text: 'Ошибка ответа сервера при добавлении товара',
            update: false,
          },
          { root: true }
        );
      } finally {
        commit('endProccess', id);
      }
    }
  },
  async remove({ state, getters, commit }, { id }) {
    try {
      if (getters.canUpdate(id)) {
        commit('startProccess', id);
        let res = await cartApi.remove(state.token, id);

        if (res === true) {
          commit('remove', { ind: getters.index(id) });
        }
        setTimeout(commit('endProccess', { rid: id }), 10000);
      }
    } catch (error) {
      commit('endProccess', id);
      console.log(error);
    }
  },
  async setCnt(
    { state, getters, commit, dispatch, rootState, rootGetters },
    { id, cnt }
  ) {
    if (getters.canUpdate(id)) {
      try {
        commit('startProccess', id);
        let res = false;
        res = await cartApi.count(state.token, id, cnt);

        if (res === true) {
          let item = getters.productsDetailed.find(
            (product) => product.id === id
          );
          cnt < 1
            ? commit('remove', { ind: getters.index(id) })
            : item.rest >= cnt
            ? commit('setCnt', { id: id, cnt: cnt })
            : '';
          commit('endProccess', id);
        }
      } catch (e) {
        dispatch(
          'alerts/add',
          {
            name: 'cartCnt',
            text: 'Ошибка ответа сервера при изменении количества товара',
            update: false,
          },
          { root: true }
        );
      } finally {
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
