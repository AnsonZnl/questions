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
router.post('/',async ctx=>{
    let answerData = JSON.stringify(ctx.request.body.answerData)
    let userName = ctx.request.body.userName
    let res = await http.post('/api/answer', {userName, answerData})
    ctx.body = {
        success: true,
        data: {id: res.data.id}
    }
})
module.exports = router