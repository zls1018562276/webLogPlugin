/**
 * 监听错误
 */
function interceptError() {
  // 监听全局错误
  window.onerror = (message, source, _lineno, _colno, error) => {
    console.error(`${message}, ${error}, ${source}`);
  };

  // 监听未处理的 promise 错误，不能打印 event.reason，JSON.stringify 后为空对象 {}
  window.onunhandledrejection = (event) => {
    // 这里如果打印 event.reason 在控制台是可以看到报错的，但是 JSON.stringify 却为空
    // 必须打印 event.reason.stack
    console.error(event.reason.stack);
  };
}
export default interceptError;
