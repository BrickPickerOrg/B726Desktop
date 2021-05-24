import { service } from '@/plugins/request'

const useApi = () => {
  // 搜索咪咕音乐
  const miGuMusicHomeApi = () => {
    return service.req({
      url: '/migu/home/'
    })
  }

  // 搜索咪咕音乐
  const queryMiGuMusicByKeywordApi = ({text = '', page = 1, type = 'song'}) => {
    return service.req({
      url: '/migu/search/all',
      data: {
        text,
        page,
        type
      }
    })
  }

  // 获取歌曲播放链接
  const getMiGuMusicAudioUrlApi = ({ id = '', name = '', singer = '', contentId = '' }) => {
    return service.req({
      url: '/migu/search/song_url',
      data: {
        id,
        name,
        contentId,
        singer
      }
    })
  }

  // 获取歌词
  const getMiGuMusicLyricApi = ({ cid = '' }) => {
    return service.req({
      url: '/migu/search/lyric',
      data: {
        cid
      }
    })
  }

  // 获取全部排行榜类型
  const getAllTopTypesApi = () => {
    return service.req({
      url: '/migu/top/top_types'
    })
  }

  // 通过排行榜类型获取榜单歌曲
  const getListByTopTypeApi = ({ type = '' }) => {
    return service.req({
      url: '/migu/top/top_detail',
      data: {
        type
      }
    })
  }

  // 歌单列表
  const getPlaylistItemsApi = ({ sort = 'latest', page = 1, tagId = '' }) => {
    return service.req({
      url: '/migu/playlist/list',
      data: {
        sort,
        page,
        tagId
      }
    })
  }

  // 歌单详情
  const getPlaylistDetailApi = ({ id = '' }) => {
    return service.req({
      url: '/migu/playlist/detail',
      data: {
        id,
      }
    })
  }

  // 歌手详情
  const getSingerDetailApi = ({ id = '' }) => {
    return service.req({
      url: '/migu/singer/singer_detail',
      data: {
        id,
      }
    })
  }

  // 获取歌手所有歌曲
  const getSingerAllSongApi = ({ id = '', page = 1 }) => {
    return service.req({
      url: '/migu/singer/all_song',
      data: {
        id,
        page
      }
    })
  }

  // 专辑详情
  const getAlbumDetailApi = ({ id = '' }) => {
    return service.req({
      url: '/migu/album/album_detail',
      data: {
        id,
      }
    })
  }

  return {
    miGuMusicHomeApi,
    queryMiGuMusicByKeywordApi,
    getMiGuMusicAudioUrlApi,
    getMiGuMusicLyricApi,
    getAllTopTypesApi,
    getListByTopTypeApi,
    getPlaylistItemsApi,
    getPlaylistDetailApi,
    getSingerDetailApi,
    getSingerAllSongApi,
    getAlbumDetailApi
  }
}

export default useApi
