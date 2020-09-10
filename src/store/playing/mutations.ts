/** @format */

import { MutationTree } from 'vuex';
import { playingState } from './types';
import Utils from '@/common/utils';

export const mutations: MutationTree<playingState> = {
  formatPlaying(state, playing) {
    let singerId = [''];
    let singer = '';

    if (playing.artists && playing.artists.length > 0) {
      singerId = playing.artists.map((artist: any) => {
        return artist.id;
      });

      const singersList = playing.artists.map((artist: any) => {
        return artist.name;
      });

      singer = singersList.join(' ');
    }

    state.platform = playing.platform;
    state.name = playing.name;
    state.id = playing.id;
    state.cid = playing.cid;
    state.singerId = singerId;
    state.singer = singer;
    state.albumName = (playing.album && playing.album.name) || '';
    state.albumId = (playing.album && playing.album.id) || '';
    state.picUrl = (playing.album && playing.album.picUrl) || '';
    state.url = playing.url;
  },

  setPlayState(state, playState) {
    state.playState = playState;
  },

  setLyric(state, lyric) {
    state.lyric = {};
    lyric.split('\n').forEach((singlelrc: string) => {
      state.lyric[singlelrc.substr(1, 5)] = singlelrc.substr(10);
    });
  }
};
