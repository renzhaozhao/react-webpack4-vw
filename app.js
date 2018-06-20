const Koa = require('koa')
const serve = require('koa-static')
const { resolve } = require('path')

const app = new Koa()

app.use(serve(resolve(__dirname, 'dist')))

const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`node server is running at ${PORT}`)
})
