import { useStore } from 'vuex'
import useRequests from '@/plugins/api'
import useLocalListHandle from "@/plugins/localList";

interface Singer {
  id: string
  name: string
}

interface Album {
  id: string
  name: string
}

const usePlayerFn = () => {
  const { getMiGuMusicAudioUrlApi, getMiGuMusicLyricApi } = useRequests()
  const $store = useStore()
  const { insertMusicToList, replaceLocalList } = useLocalListHandle();

  // 格式化多个歌手名称
  const getSingersName = (singers: Array<Singer>) => {
    return singers.map((singer) => singer['name']).join('/')
  }

  // 格式化专辑名
  const getAlbumName = (album: Album | null) => {
    return album ? album.name : '-'
  }

  // 全部播放
  const playAllList = async (list: Array<any>) => {
    replaceLocalList(list)
    playCheckMusic(list[0])
  }

  // 获取歌曲播放链接和歌词并播放
  const playCheckMusic = async (song: any) => {
    const audioUrl = await getMiGuMusicAudioUrlApi({
      id: song.id,
      name: song.songName,
      contentId: song.contentId,
      singer: getSingersName(song.singers),
    })

    song['url'] = audioUrl.data.url
    $store.dispatch('playing/formatPlaying', song)
    const lyricResult = await getMiGuMusicLyricApi({
      cid: song.cid,
    })
    $store.dispatch('lyric/setLyric', lyricResult.data)
    insertMusicToList(song)
  }

  return {
    getSingersName,
    getAlbumName,
    playCheckMusic,
    playAllList,
  }
}

export default usePlayerFn
