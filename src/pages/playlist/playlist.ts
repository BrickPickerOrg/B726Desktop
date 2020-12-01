const LIST_ITEM = {
  cover: 'https://data.quanziapp.com/files/sBAKxwj/FEF818C9-51CF-430C-AE8A-4EE9A4C47CD1.png',
  id: '',
  name: '　',
  playcount: '　'
}

const LIST_ITEMS_PLACEHOLDR = Array.from({ length: 20 }, () =>
  JSON.parse(JSON.stringify(LIST_ITEM))
)

LIST_ITEMS_PLACEHOLDR.forEach((item, i) => {
  item.id = i.toString()
})

const PLAYLIST_TYPES = [
  { id: 1000001762, name: '国语' },
  { id: 1000001766, name: '英语' },
  { id: 1000001599, name: '韩语' },
  { id: 1000001767, name: '日语' },
  { id: 1000001763, name: '粤语' },
  { id: 1000001682, name: '电子' },
  { id: 1000587686, name: '夜店' },
  { id: 1000001681, name: '爵士' },
  { id: 1000001749, name: '旅行' },
  { id: 1000001674, name: '摇滚' },
  { id: 1000093923, name: '驾车' },
  { id: 1000001696, name: '怀旧' }
]

export { LIST_ITEMS_PLACEHOLDR, PLAYLIST_TYPES }
