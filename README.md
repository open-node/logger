# @open-node/logger
Record log info to logfile, info log by date, error log by error.code

[![Build status](https://travis-ci.com/open-node/logger.svg?branch=master)](https://travis-ci.org/open-node/logger)
[![codecov](https://codecov.io/gh/open-node/logger/branch/master/graph/badge.svg)](https://codecov.io/gh/open-node/logger)

# Installation
<pre>npm i @open-node/logger --save</pre>

# Usage
<pre>
const Logger = require('@open-node/logger');

const logger = Logger({ errorLogPath, infoLogPath }, deps, clientId);
</pre>



<!-- Generated by documentation.js. Update this documentation by updating the source code. -->



<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Logger][1]
    -   [Parameters][2]
    -   [error][3]
        -   [Parameters][4]
    -   [info][5]
        -   [Parameters][6]
    -   [logger][7]
        -   [Parameters][8]

## Logger

### Parameters

-   `config` **[Object][9]** 配置信息，errorLogPath, infoLogPath, 必须包含
    -   `config.errorLogPath`
    -   `config.infoLogPath`

Returns **[Logger][10]** Instance

### error

记录错误信息

#### Parameters

-   `e` **[error][11]** error对象
-   `extra` **any?** 额外要记录的信息

Returns **void**

### info

记录普通信息

#### Parameters

-   `message` **[string][12]** 要记录的信息
-   `extra` **any?** 额外要记录的信息

Returns **void**

### logger

将普通函数加工成带有日志记录功能的函数

#### Parameters

-   `fn` **[function][13]** 要加工的函数
-   `name` **[string][12]** 名称、归类
-   `isAsync` **[boolean][14]** 是否是异步函数 (optional, default `true`)
-   `transform` **[function][13]?** 返回值记录的tans 函数 (optional, default `x=>x`)
-   `errorHandler` **[function][13]?** 错误信息处理函数 (optional, default `e=>e.message`)
-   `argsHandler` **[function][13]?** 参数信息处理函数 (optional, default `JSON.stringify`)

Returns **[function][13]**

[1]: #logger

[2]: #parameters

[3]: #error

[4]: #parameters-1

[5]: #info

[6]: #parameters-2

[7]: #logger-1

[8]: #parameters-3

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[10]: #logger

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
