interface Music {
  id: string
  cid: string
  songName: string
  album: string
  cover: string
  singers: Array<{ id: string; name: string }>
}

const useLocalListHandle = () => {
  // 本地音乐播放列表
  let list = JSON.parse(localStorage.getItem('musicLocalList') || '[]')

  // 获取本地音乐播放列表
  const getLocalList = () => {
    return list
  }

  // 列表新增歌曲
  const insertMusicToList = (music: Music) => {
    if (!isListBeIncluded(music.id)) {
      list.unshift(music)
      saveLocalList()
    }
  }

  // 根据ID删除指定歌曲
  const removeMusicFromId = (id: string) => {
    list = list.filter((music: Music) => music.id !== id)
    saveLocalList()
  }

  // 判断歌曲是否已在列表中
  const isListBeIncluded = (id: string) => {
    const res = list.filter((music: Music) => music.id === id)
    return res.length > 0
  }

  // 点击全部播放替换整个播放列表
  const replaceLocalList = (newList: Array<Music>) => {
    list = newList
    saveLocalList()
  }

  // 清空列表
  const clear = () => {
    list = []
    saveLocalList()
  }

  // 保存播放列表到localStorage
  const saveLocalList = () => {
    localStorage.setItem('musicLocalList', JSON.stringify(list))
  }

  return {
    getLocalList,
    insertMusicToList,
    removeMusicFromId,
    isListBeIncluded,
    replaceLocalList,
    clear,
    saveLocalList,
  }
}

export default useLocalListHandle