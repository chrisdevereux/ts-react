import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Redux from 'redux'

import App from './app'

interface ClientConfig<T> {
  middleware?: Redux.Middleware[]
  enhancers?: Redux.StoreEnhancer<T>[]
}

/** Initial application state inherited from server */
declare var __reduxAppInitialState: any

/** Render an App object as a client-side React app, initializing with the state inherited from the server */
export default function render<T>(app: App<T>, opts: ClientConfig<T> = {}) {
  const middleware = opts.middleware || []
  const storeEnhancer = Redux.compose(
    Redux.applyMiddleware(...middleware),
    ...(opts.enhancers || [])
  )

  const store = Redux.createStore(app.reducer, __reduxAppInitialState, storeEnhancer)

  app.match(window.location.pathname, store).then(
    ({ content }) => {
      ReactDOM.render(
        <Client initialContent={content} />,
        document.getElementById(app.rootElementID)
      )
    },
    (error) => {
      console.error(error)
    }
  )
}

interface ClientProps {
  initialContent: React.ReactElement<{}>
}

interface ClientState {
  content: React.ReactElement<{}>
}

class Client extends React.Component<ClientProps, ClientState> {
  constructor(props: ClientProps) {
    super(props)
    this.state = { content: props.initialContent }
  }

  render() {
    return this.state.content
  }
}
