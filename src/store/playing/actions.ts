/** @format */

import { playingState } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '../types';

export const actions: ActionTree<playingState, RootState> = {
  formatPlaying({ commit }, playing): void {
    commit('formatPlaying', playing);
  },

  setPlayState({ commit }, playState): void {
    commit('setPlayState', playState);
  },

  setLyric({ commit }, lyric): void {
    commit('setLyric', lyric);
  }
};
