import { MutationTree } from 'vuex';
import { playingState } from './types';
import Utils from '@/common/utils';

export const mutations: MutationTree<playingState> = {
  formatPlaying(state, playing) {
    state.platform = playing.platform;
    state.name = playing.songName;
    state.id = playing.id;
    state.cid = playing.cid;
    state.singer = playing.singers;
    state.albumName = (playing.album && playing.album.name) || '';
    state.albumId = (playing.album && playing.album.id) || '';
    state.cover = playing.cover;
    state.url = playing.url;
  },

  setPlayState(state, playState) {
    state.playState = playState;
  },
};
