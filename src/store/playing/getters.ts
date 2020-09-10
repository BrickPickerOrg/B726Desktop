/** @format */

import { GetterTree } from 'vuex';
import { playingState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<playingState, RootState> = {
  getPlaying(state): playingState {
    return state;
  }
};
