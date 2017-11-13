const chokidar = require('chokidar')
const { join } = require('path')

const watcher = chokidar.watch(join(__dirname, '../'))

watcher.on('ready', () => {
    watcher.on('all', () => {
        console.log("Clearing /server/ module cache from server")
        Object.keys(require.cache).forEach(id => {
            if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
        })
    })
})
