
require('@babel/register')

// require('./app.js')


const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const router = require('./middleware/router')()
const apiDoc = require('./middleware/apiDoc')


const app = new Koa()







// app.use(async (ctx,next) => {
//     ctx.throw(500);
// });

// app.use( async (ctx,next)=>{
//     await next()
//     ctx.body ={ msg:'hello,world' }
// })

// app.use(async (ctx, next)=> {
//     await next();
//     ctx.status = 404
//     ctx.body="404页面"
    
// });

// router.get('/s', (ctx,next)=>{
//     ctx.body = 'hello  Router'
// })
app.use(bodyParser())
apiDoc(router);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000')
})
