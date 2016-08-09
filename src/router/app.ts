import * as React from 'react'
import * as Redux from 'redux'

const RouteRecognizer = require('route-recognizer')

export interface Request<T> {
  get(id: string): string
  store: Redux.Store<T>
}

export interface Response {
  title: string
  status?: number
  content: React.ReactElement<{}>
}

export type RequestHandler<T> = (req: Request<T>) => PromiseLike<Response> | Response

export default class App<T> {
  rootElementID: string = 'app-root'
  router: any
  reducer: Redux.Reducer<T>

  constructor(reducer: Redux.Reducer<T>) {
    this.reducer = reducer
    this.router = new RouteRecognizer()
  }

  get(path: string, handler: RequestHandler<T>) {
    this.router.add([{ path, handler }])
  }

  match(path: string, store: Redux.Store<T>): PromiseLike<Response> {
    try {
      const matches: any[] = this.router.recognize(path) || []

      if (matches.length === 0) {
        throw Error(`Could not match route ${path}`)
      }

      const handler: RequestHandler<T> = matches[0].handler
      const params: { [key: string]: string } = matches[0].params

      const req = {
        store,
        get(key: string) {
          if (params[key]) {
            return params[key]

          } else {
            throw Error(`Param :${key} not present in matched route`)
          }
        }
      }

      return Promise.resolve(handler(req))

    } catch (error) {
      return Promise.reject(error)
    }
  }
}
