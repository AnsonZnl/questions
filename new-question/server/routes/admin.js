const Router = require('koa-router');
const http = require('../utils/http')
const router = new Router({
    prefix: '/admin'
})

router.get('/', async ctx => {
    let res = await http.get('/api/test/count', {
        params: {
            filter: {
                "where": {}
            }
        }
    })
    ctx.body = {
        success: true,
        data: res.data
    }
})
module.exports = router