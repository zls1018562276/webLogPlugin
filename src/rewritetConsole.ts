export default function () {
    const { reConsoleFn } = this.config
    reConsoleFn.forEach((key) => {
        const rewrite = console[key]
        console[key] = (...args) => {
            const log = `[${key}]`
            this.insertLog(log, ...args)
            rewrite.apply(console, [log, ...args])
        }
    })
}