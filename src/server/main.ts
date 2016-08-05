import * as express from 'express'
import render from './render'

export default function main(injectedMiddleware: express.Handler[]) {
  const app = express()
  injectedMiddleware.forEach(m => {
    app.use(m)
  })

  app.get('/', render())

  const port = process.env.PORT || 8000
  app.listen(port, (err: Error) => {
    if (err) {
      throw err;
    }

    console.log(`Application started on port ${port}`)
  })
}
