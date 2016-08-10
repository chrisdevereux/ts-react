export type PendingState<T, M>
= { state: 'started', metadata: M }
| { state: 'failed', metadata: M, error: Error }
| { state: 'completed', metadata: M, value: T }


export interface PendingConfig<T, M> {
  task: Promise<T>
  metadata: M
  notify: (s: PendingState<T, M>) => void
}

export function task<T, M>(config: PendingConfig<T, M>): Promise<T> {
  const { metadata, notify, task  } = config

  notify({ state: 'started', metadata })

  return task.then(
    (value: T) => {
      notify({ state: 'completed', metadata, value })
      return value
    },
    (error: Error) => {
      notify({ state: 'failed', metadata, error })
      throw error
    }
  )
}
