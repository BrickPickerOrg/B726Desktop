import { downloaderState } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '../types';

export const actions: ActionTree<downloaderState, RootState> = {
  download({ commit }, params): void {
    commit('download', params);
  }
};
