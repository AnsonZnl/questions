const Router = require('koa-router');
const http = require('../utils/http')
const router = new Router({
    prefix: '/admin'
})

router.get('/', async ctx => {
    let res = await http.get('/api/question', {
        params: {
            filter: {
                "where": {},
                "skip": 0,
                "limit": 20
            }
        }
    })
    ctx.body = {
        success: true,
        data: res.data
    }
})
router.get('/answer', async ctx => {
    let res = await http.get('/api/answer', {
        params: {
            filter: {
                "where": {},
                "skip": 0,
                "limit": 20
            }
        }
    });
    ctx.body = {
        success: true,
        data: res.data
    }
})
module.exports = router