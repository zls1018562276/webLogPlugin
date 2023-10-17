import webLog from './webLog'
let log = null
export default function (config) {
    if (!log) log = new webLog(config) 
    return {
        // 主动记录日志
        log: function(...arg) {
            log.insertLog('[Proactively calling]' ,...arg)
        }
    }
}
