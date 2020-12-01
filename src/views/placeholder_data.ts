const SONG_LIST_ITEM = {
  cover: 'https://data.quanziapp.com/files/sBAKxwj/FEF818C9-51CF-430C-AE8A-4EE9A4C47CD1.png',
  id: '',
  songName: '　',
  singers: [{id: '', name: '　'}]
}

const SONG_LIST_ITEMS_PLACEHOLDR = Array.from({ length: 10 }, () =>
  JSON.parse(JSON.stringify(SONG_LIST_ITEM))
)

SONG_LIST_ITEMS_PLACEHOLDR.forEach((item, i) => {
  item.id = i.toString()
})

// 歌单列表占位
const PLAYLIST_ITEM = {
  cover: 'https://data.quanziapp.com/files/sBAKxwj/FEF818C9-51CF-430C-AE8A-4EE9A4C47CD1.png',
  id: '',
  name: '　',
  playcount: '　'
}

const PLAYLIST_ITEMS_PLACEHOLDR = Array.from({ length: 10 }, () =>
  JSON.parse(JSON.stringify(PLAYLIST_ITEM))
)

PLAYLIST_ITEMS_PLACEHOLDR.forEach((item, i) => {
  item.id = i.toString()
})

export { SONG_LIST_ITEMS_PLACEHOLDR, PLAYLIST_ITEMS_PLACEHOLDR }
