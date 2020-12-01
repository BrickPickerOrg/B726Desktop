/** @format */

import { Module } from 'vuex';
import { playingState } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: playingState = {
  platform: 'kugou',
  playState: false,
  name: '',
  id: '',
  cid: '',
  singer: [{id: '', name: ''}],
  albumName: '',
  albumId: '',
  cover: 'https://data.quanziapp.com/files/sBAKxwj/FEF818C9-51CF-430C-AE8A-4EE9A4C47CD1.png',
  url: '',
  lyric: { '': '' }
};

export const playing: Module<playingState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default state;
