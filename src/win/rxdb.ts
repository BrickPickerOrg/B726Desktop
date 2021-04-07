var RxDB = require('rxdb')
RxDB.create({
  // 创建数据库
  name: 'heroesdb',
  adapter: 'websql',
  password: 'myLongAndStupidPassword', // 可选的
})
  .then((db: any) => db.collection({ name: 'heroes' }))
  .then((collection: any) => {
    collection.insert({ name: 'Bob' })
  })
