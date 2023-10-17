/**
 * 劫持 xhr 请求
 */
function interceptXHR() {
  // 重写 xhr.open 方法，open 方法接收两个参数，第一个为请求方法，第二个为请求地址
  const xhrOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (...args) {
    const method = args[0]
    const url = args[1]

    // 调用原生方法
    xhrOpen.apply(this, args)
    // 监听 readystatechange 事件
    this.addEventListener('readystatechange', () => {
      if (this.readyState === XMLHttpRequest.prototype.DONE) {
        // 20 开头的状态码都是成功的，比如201、204
        if (String(this.status).startsWith('20')) {
          // 正常 http 请求不需要打印到控制台，在 network 里可以看到完整信息，
          // 只需要记录到 indexDB 并上传服务器即可，所以不能使用 console.log
          this.insertLog(
            `[http ok] method: ${method}, url: ${url}, status: ${this.status}, response: ${this.response}`
          )
        } else {
          // http 请求异常
          this.insertLog(
            `[http error] method: ${method}, url: ${url}, status: ${this.status}, response: ${this.response}`
          )
        }
      }
    })
  }
}

export default interceptXHR