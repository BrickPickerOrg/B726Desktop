/** 
 *  歌曲文件下载
 */

import { Module } from 'vuex';
import { downloaderState } from './types';
import { RootState } from '../types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: downloaderState = {
  downloadUrl: '',
};

export const downloader: Module<downloaderState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default state;
