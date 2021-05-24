
import { MutationTree } from 'vuex';
import { lyricState } from './types';

export const mutations: MutationTree<lyricState> = {
  setLyric(state, lyric) {
    state.lrc = {};
    lyric.split('\n').forEach((singlelrc: string) => {
      state.lrc[singlelrc.substr(1, 5)] = singlelrc.substr(10);
    });
  }
};
