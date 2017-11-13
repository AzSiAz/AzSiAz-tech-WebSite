const next = require('next')
const server = require('server')
const { get } = require('server/router')
const router = require('./server/router')

const dev = process.env.NODE_ENV !== 'production'

const init = async () => {
    
    const app = next({ dev })
    const handle = app.getRequestHandler()
    await app.prepare()

    // TODO: Need fix for express hot-reload using nodemon for now instead
    // if (dev) require('./server/utils/hot-reload')

    await server(
        { port: 8080 },
        router,
        get(ctx => handle(ctx.req, ctx.res))
    )
}

init().catch(err => console.error(err))
