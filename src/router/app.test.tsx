import * as React from 'react'
import * as Redux from 'redux'
import { expect } from 'chai'

import App, { Response } from './app'

describe('App', () => {
  describe('matching route', () => {
    it('should render the route’s root element', () => {
      const reducer = (x: any) => x
      const app = new App(reducer)
      const store = Redux.createStore(reducer)

      app.get('/foo/:myParam', (req) => ({
        title: req.get('myParam'),
        content: <div />
      }))

      return app.match('/foo/hello', store).then((resp: Response) => {
        expect(resp).to.eql({ title: 'hello', content: <div /> })
      })
    })
  })
})
