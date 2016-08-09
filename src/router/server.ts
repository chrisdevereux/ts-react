import * as ReactDOM from 'react-dom/server'
import * as Redux from 'redux'
import * as Express from 'express'

import App, { Response } from './app'

interface ServerConfig {
  middleware?: Redux.Middleware[]
}

/** Render an App object as a client-side React app, initializing with the state inherited from the server */
export default function renderMiddleware<T>(app: App<T>, opts: ServerConfig = {}): Express.RequestHandler {
  return (req, res, next) => {
    const middleware = opts.middleware || []
    const storeEnhancer = Redux.applyMiddleware(...middleware)
    const store = Redux.createStore(app.reducer, storeEnhancer)

    app.match(req.path, store).then(
      (response) => {
        res.writeHead(response.status || 200, { 'Content-Type': 'text/html' })
        res.write(renderPage(response, app.rootElementID, store.getState()))
        res.end()
      },
      (error) => {
        console.error(error)
        next(error)
      }
    )
  }
}

function renderPage({ content, title }: Response, elementID: string, initialState: {}) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>
  <body>
    <div id="${elementID}">${ReactDOM.renderToString(content)}</div>
    <script>
      var __reduxAppInitialState = ${JSON.stringify(initialState)}
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>`
}
