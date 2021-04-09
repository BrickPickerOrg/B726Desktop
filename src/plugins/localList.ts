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
    return JSON.parse(localStorage.getItem('musicLocalList') || '[]')
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

  // 根据ID获取当前歌曲在列表中的Index
  const getMusicIndexOfList = (id: string) => {
    const _list = getLocalList().map((music: Music) => music.id)
    return _list.indexOf(id)
  }

  // 根据ID获取当前歌曲的上一首
  const prevMusic = (id: string) => {
    const currentIndex = getMusicIndexOfList(id)
    if (currentIndex === -1) {
      // 当前播放的歌曲已被从列表中移除 返回列表的第一首
      return getLocalList()[0]
    }
    if (currentIndex === 0) {
      // 当前是最后一首
      return getLocalList()[getLocalList().length - 1]
    }
    return getLocalList()[currentIndex - 1]
  }

  // 根据ID获取当前歌曲的下一首
  const nextMusic = (id: string) => {
    const currentIndex = getMusicIndexOfList(id)
    if (currentIndex === -1) {
      // 当前播放的歌曲已被从列表中移除 返回列表的第一首
      return getLocalList()[0]
    }
    if (currentIndex === getLocalList().length - 1) {
      // 当前是最后一首
      return getLocalList()[0]
    }
    return getLocalList()[currentIndex + 1]
  }

  return {
    getLocalList,
    insertMusicToList,
    removeMusicFromId,
    isListBeIncluded,
    replaceLocalList,
    clear,
    saveLocalList,
    getMusicIndexOfList,
    prevMusic,
    nextMusic
  }
}

export default useLocalListHandle
