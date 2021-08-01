# static-server

基于koa的静态文件服务，并支持配置PWA的history模式的转发。并且支持请求代理。

## 快速开始

下载项目到本地，首先安装依赖
```
npm i
```

启动项目
```
npm start
```

## SPA应用转发配置
通过配置`rewriteConfigs`，实现转发；
+ `match`: 项目根目录地址
+ `pathname`: index.html的地址

## 插件

+ `koa-proxies`: https://github.com/vagusX/koa-proxies
+ `koa-static`: https://github.com/koajs/static