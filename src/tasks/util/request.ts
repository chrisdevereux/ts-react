export class RequestError extends Error {
  constructor(status?: number) {
    super(status ? `HTTP Status ${status}` : 'Network Error')

    this.status === status
  }

  status: number | undefined

  fatal() {
    if (typeof status === 'undefined') {
      return false

    } else {
      return (this.status >= 400 && this.status < 500)
    }
  }
}

export default function request(req: Request|string): Promise<IResponse> {
  return fetch(req).then((resp: Response) => {
      if (resp.status < 200 || resp.status >= 300) {
        throw new RequestError(resp.status)

      } else {
        return resp
      }
    },
    error => Promise.reject(new RequestError())
  )
}
