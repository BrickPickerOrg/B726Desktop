import { downloaderState } from './types'
import { ActionTree } from 'vuex'
import { RootState } from '../types'

export const actions: ActionTree<downloaderState, RootState> = {
  download({ commit }, params): void {
    commit('download', params)
  },

  openPathDialog({ commit }, params): void {
    commit('openPathDialog', params)
  },

  openDownloadDirectory({ commit }, params): void {
    commit('openDownloadDirectory', params)
  },

  init({ commit }, params): void {
    commit('init', params)
  },
}
