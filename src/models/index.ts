import * as MyModel from './my-model'

export type Action
= { kind: 'my-model', payload: MyModel.Action }
| { kind: undefined }

export type State = {
  counter: MyModel.State
}

export type Task<T> = (dispatch: Dispatcher, getState: () => State) => Promise<T>
export type Dispatcher = (a: Dispatchable) => void
export type Dispatchable = Action|Task<any>

export function update(state: State|undefined, action: Action): State {
  return {
    counter: MyModel.update(
      state && state.counter,
      (action.kind === 'my-model') ? action.payload : { kind: undefined }
    )
  }
}
