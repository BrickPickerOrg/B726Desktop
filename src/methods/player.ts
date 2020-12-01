import { useStore } from 'vuex';
import useRequests from '@/methods/api.ts';

interface Singer {
  id: string;
  name: string;
}

interface Album {
  id: string;
  name: string;
}

const usePlayerFn = () => {
  const { getMiGuMusicAudioUrlApi, getMiGuMusicLyricApi } = useRequests();
  const $store = useStore();

  // 格式化多个歌手名称
  const getSingersName = (singers: Array<Singer>) => {
    return singers.map(singer => singer['name']).join('/');
  };

  // 格式化专辑名
  const getAlbumName = (album: Album | null) => {
    return album ? album.name : '-';
  };

  // 获取歌曲播放链接和歌词并播放
  const playCheckMusic = async (song: any) => {
    try {
      const audioUrl = await getMiGuMusicAudioUrlApi({
        id: song.id,
        name: song.songName,
        singer: getSingersName(song.singers)
      });

      song['url'] = audioUrl.data.url;
      $store.dispatch('playing/formatPlaying', song);
      const lyricResult = await getMiGuMusicLyricApi({
        cid: song.cid
      });
      $store.dispatch('playing/setLyric', lyricResult.data);
    } catch (error) {
      throw error;
    }
  };

  return {
    getSingersName,
    getAlbumName,
    playCheckMusic
  };
};

export default usePlayerFn;
