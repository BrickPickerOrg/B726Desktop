
import { lyricState } from './types';
import { ActionTree } from 'vuex';
import { RootState } from '../types';

export const actions: ActionTree<lyricState, RootState> = {
  setLyric({ commit }, lyric): void {
    commit('setLyric', lyric);
  }
};
