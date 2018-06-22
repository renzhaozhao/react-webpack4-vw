const Koa = require('koa')
const serve = require('koa-static')
const { resolve } = require('path')


const app = new Koa()

app.use(serve(resolve('dist')))

const PORT = 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`node server is running at ${PORT}`)
})
