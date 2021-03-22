const fs = require("fs");
const uuidv4 = require("uuid/v4");

const date = (offset = 0) => new Date(Date.now() + (offset | 0)).toISOString();

/**
 * @param {Object} config 配置信息，errorLogPath, infoLogPath, 必须包含
 * @class
 * @return {Logger} Instance
 */
function Logger({ errorLogPath, infoLogPath, ignoreErrors }, { _ }) {
  const makeDir = _.memoize(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  });

  const ignores = new Set(ignoreErrors);

  /**
   * 记录错误信息
   * @memberof Logger
   * @instance
   * @param {error} e error对象
   * @param {any} [extra] 额外要记录的信息
   *
   * @return {void}
   */
  const error = (e, extra) => {
    if (!e) {
      console.trace("Logger.error but error is null or undefined");
      return;
    }
    const time = date();
    const today = time.split("T")[0];
    const code = e.code || "unknown";
    // 忽略某些错误
    if (ignores.has(code)) return;
    const dir = `${errorLogPath}/${today}`;
    makeDir(dir);
    const file = `${dir}/${code}.err`;
    const content = [time, e.message];
    if (e.data) content.push(JSON.stringify(e.data));
    if (extra != null) content.push(JSON.stringify(extra));
    if (e.stack) content.push(JSON.stringify(e.stack));
    fs.appendFileSync(file, `${content.join("\t")}\n`);
  };

  /**
   * 记录普通信息
   * @memberof Logger
   * @instance
   * @param {string} message 要记录的信息
   * @param {any} [extra] 额外要记录的信息
   *
   * @return {void}
   */
  const info = (message, extra) => {
    const time = date();
    const today = time.split("T")[0];
    const dir = `${infoLogPath}/${today}`;
    makeDir(dir);
    const file = `${dir}/info.log`;
    const content = [time, message];
    if (extra != null) content.push(JSON.stringify(extra));
    fs.appendFileSync(file, `${content.join("\t")}\n`);
  };

  /**
   * 将普通函数加工成带有日志记录功能的函数
   * @memberof Logger
   * @instance
   * @param {function} fn 要加工的函数
   * @param {string} name 名称、归类
   * @param {boolean} [isAsync=true] 是否是异步函数
   * @param {function} [transform] 返回值记录的tans 函数
   * @param {function} [errorHandler] 错误信息处理函数
   * @param {function} [argsHandler] 参数信息处理函数
   *
   * @return {function}
   */
  const logger = (
    fn,
    name,
    isAsync = true,
    transform = x => x,
    errorHandler = e => e && e.message,
    argsHandler = JSON.stringify
  ) => {
    if (isAsync) {
      return async (...args) => {
        const callId = uuidv4();
        try {
          info(`Begin: ${name}\t${callId}\t${argsHandler(args)}`);
          const startedAt = Date.now();
          const res = await fn(...args);
          info(
            `Completed: ${name}\t${callId}\t${Date.now() - startedAt}ms\t${JSON.stringify(
              transform(res)
            )}`
          );
          return res;
        } catch (e) {
          info(`Error: ${name}\t${callId}\t${errorHandler(e)}`, e.stack);
          throw e;
        }
      };
    }
    return (...args) => {
      const callId = uuidv4();
      try {
        info(`Begin: ${name}\t${callId}\t${argsHandler(args)}`);
        const startedAt = Date.now();
        const res = fn(...args);
        info(`Completed: ${name}\t${callId}\t${Date.now() - startedAt}ms\t${JSON.stringify(res)}`);
        return res;
      } catch (e) {
        info(`Error: ${name}\t${callId}\t${e.message}`, e.stack);
        throw e;
      }
    };
  };

  return { error, info, logger };
}

module.exports = Logger;
