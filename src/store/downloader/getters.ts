import { GetterTree } from 'vuex';
import { downloaderState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<downloaderState, RootState> = {
  getDownloader(state): downloaderState {
    return state;
  }
};
