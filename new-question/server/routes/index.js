const Router = require('koa-router');
const router = new Router()
const http = require('../utils/http')
router.get('/', async ctx => {
    let res = await http.get('/api/question', {
        params: {
            filter: {"where":{},"skip":0,"limit":20}
        }
    })
    ctx.body = {
        success: true,
        data: res.data
    }
})
module.exports = router