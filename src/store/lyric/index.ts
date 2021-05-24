
import { Module } from 'vuex';
import { lyricState } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: lyricState = {
  lrc: { '': '' }
};

export const lyric: Module<lyricState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default state;
