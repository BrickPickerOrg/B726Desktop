import { GetterTree } from 'vuex';
import { lyricState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<lyricState, RootState> = {
  getPlaying(state): lyricState {
    return state;
  }
};
