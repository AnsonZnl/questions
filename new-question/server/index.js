const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const index = require('./routes')
const admin = require('./routes/admin')

app.use(cors())
app.use(index.routes())
app.use(admin.routes())
app.listen(3000, ()=>{
    console.log('server running http://localhost:3000')
})