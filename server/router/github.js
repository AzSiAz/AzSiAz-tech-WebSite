const { get } = require('server/router')
const { json } = require('server/reply')
const scrapeIt = require('scrape-it')

module.exports = [
    get('/api/github/:user', async ctx => {
        const apiUrl = `https://github.com/${ctx.params.user}`
        
        const pageData = await scrapeIt(apiUrl, {
            repositories: {
                listItem: '.pinned-repo-item',
                name: 'repositories',
                data: {
                    title: '.repo.js-repo',
                    link: {
                        selector: '.text-bold',
                        attr: 'href',
                        convert: x => `https://github.com${x}`
                    }
                }
            }
        })
        
        return json(pageData)
    })
]
