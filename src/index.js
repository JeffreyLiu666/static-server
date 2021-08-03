const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaProxy = require('koa-proxies')
const send = require('koa-send')
const url = require('url')
const path = require('path')
const { clearConsole } = require('./util')

const app = new Koa()
const port = 3000
const staticPath = path.resolve(process.cwd(), 'public')

// 请求代理
app.use(KoaProxy('/api', {
    target: 'http://localhost:80',
    changeOrigin: true
}))

// 静态文件服务
app.use(KoaStatic(staticPath))

// 转发配置
const rewriteConfigs = [
    { match: '/app', pathname: '/app/index.html' }
]
// SPA项目history模式转发
app.use(async (ctx, next) => {
    await next()

    if (
        (ctx.method !== 'HEAD' && ctx.method !== 'GET') ||
        ctx.body !== undefined ||
        ctx.status !== 404
    ) return

    const urlObj = url.parse(ctx.url)
    let pathname = urlObj.pathname
    for (let item of rewriteConfigs) {
        if (pathname.startsWith(item.match)) {
            pathname = item.pathname
            break
        }
    }
    try {
        await send(ctx, pathname, { index: 'index.html', root: staticPath })
    } catch (err) {
        return err
    }
})

app.listen(3000, () => {
    const localUrl = `http://localhost:${ port }`
    clearConsole()
    console.log('  server listening: \n')
    console.log(`     -    ${ localUrl }`)
})