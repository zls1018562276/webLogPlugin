import rewritetConsole from './rewritetConsole'
import interceptXHR from './interceptXHR'
import interceptFetch from './interceptFetch'
import interceptError from './interceptError'
import insertLog from './insertLog'

interface defaultConfigInterface {
    logStringLength: number
    format: string
    logStoreSize: number
    reConsole: boolean
    reConsoleFn: Array<string>
    reXHR: boolean
    reFetch: boolean
    reError: boolean
}

// 多层遍历
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
}

type ConfigInterface  = DeepPartial<defaultConfigInterface>


/**
 * 日志配置类
 * @param { Number } logStringLength 单条日志字符长度
 * @param { String } format 日志时间格式 默认YYYY-MM-DD HH:mm:ss:SSS
 * @param { Number } logStoreSize 日志存储大小(单位B) 默认10MB
 * @param { Boolean } reConsole 是否记录console日志
 * @param { Array } reConsoleFn 改写console的几个方法
 * @param { Boolean } reXHR 是否记录XHR请求日志
 * @param { Boolean } reFetch 是否记录Fetch请求日志
 * @param { Boolean } reError 是否记录系统error请求日志
 */

class webLogConfig {
    constructor (config: ConfigInterface) {
        Object.keys(config).forEach((key) => {
            if (key in this.config) {
                // 存在该配置项
                this.config[key] = config[key]
            }
        })
    }
    config: defaultConfigInterface = {
        logStringLength: 1000,
        format: 'YYYY-MM-DD HH:mm:ss:SSS',
        logStoreSize: 10 * 1024 * 1024,
        reConsole: true,
        reConsoleFn: ['log', 'warn', 'error'],
        reXHR: true,
        reFetch: true,
        reError: true
    }
}


class webLog extends webLogConfig {
    constructor (config:ConfigInterface = {}) {
        super(config)
        this.insertLog = insertLog
        if (this.config.reConsole) rewritetConsole.call(this) // console方法插入日志
        if (this.config.reXHR) interceptXHR.call(this) // XHR请求插入日志
        if (this.config.reFetch) interceptFetch.call(this) // fetch 请求插入日志
        if (this.config.reError) interceptError.call(this) // window error错误日志
    }
    insertLog = null
}

export default webLog