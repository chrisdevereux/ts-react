import * as React from 'react'
import App from './router/app'
import { update } from './models'

const app = new App(update)
export default app

app.get('/:resort', (req) => ({
  title: `Holiday Weather | ${req.get('resort')}`,
  content: <div>Hello, World!</div>
}))
