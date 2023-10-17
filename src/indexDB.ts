import Dexie from 'dexie'

class IndexDB extends Dexie {
  /** 初始化 */
  constructor() {
    super('logger')
    this.version(1).stores({
      logs: '++id, message',
      flag: '++id, latestMessageId, hasUploadMessageId'
    })
  }
}

let db = new IndexDB()

export default db