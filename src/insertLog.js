import db from './indexDB'
import dayjs from 'dayjs'

async function insertLog (...args) {
    const messages = []
    args.forEach((arg) => {
        if (typeof arg === 'string') {
            messages.push(arg)
        } else {
            // 非字符串需要通过 JSON.stringify 转义成字符串
            try {
                messages.push(JSON.stringify(arg))
            } catch {}
        }
    })

    // 拼接后的日志内容
    const message = messages.join(' ').trim()
    const { logStringLength } = this.config

    // 日志为空或者超过最大长度不记录
    if (message.length === 0 || message.length > logStringLength) {
        return
    }

    try {
        
        const { format } = this.config
        const now = dayjs().format(format)
        // 插入日志
        const id = await db.logs.add({
            message: `${now} ${message}`
        })

        // 更新
        db.flag.update(1, {
            latestMessageId: id
        }).then((updated) => {
            if (updated) {
                this.latestMessageId = id
            }
        })
    } catch (error) {}
}

export default insertLog