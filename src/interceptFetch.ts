import dayjs from "dayjs";
/**
 * 劫持 fetch 请求
 */
function interceptFetch() {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    let [url, config] = args;
    // 请求开始时间
    const { format } = this.config
    const start = dayjs().format(format);
    const response = await originalFetch(url, config);

    // 响应内容
    let responseText = "";
    try {
      responseText = await response.clone().json();
    } catch (error) {
      responseText = "";
    }
    // 20 开头的状态码都是成功的，比如201、204
    if (String(response.status).startsWith("20")) {
      this.insertLog(
        `[http ok] method: ${
          config?.method || "get"
        }, url: ${url}, status: ${response.status}, requestBody: ${
          config?.body
        }, requestTime: ${start}, response: `,
        responseText
      );
    } else {
      this.insertLog(
        `[http error] method: ${
          config?.method || "get"
        }, url: ${url}, status: ${response.status}, requestBody: ${
          config?.body
        }, requestTime: ${start}, response: `,
        responseText
      );
    }

    return response;
  };
}

export default interceptFetch;
