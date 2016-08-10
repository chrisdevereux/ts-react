import { Action, Task } from '../../models'

export default function observeActions(task: Task<any>, state?: any): Promise<Action[]> {
  const actions: any = []
  const dispatcher = ((x: any) => actions.push(x))

  return task(dispatcher, state).then(() => actions)
}
