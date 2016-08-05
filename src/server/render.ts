import * as express from 'express'

export default function render(): express.RequestHandler {
  return (req: express.Request, res: express.Response) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(`Hello`)
    res.end()
  }
}