export const columnIds = {
  Todo: 'todo',
  Progress: 'progress',
  Done: 'done'
} as const

export type columnIdT = typeof columnIds[keyof typeof columnIds]

export interface TaskT {
  id: string
  title: string
}

export interface BoardData {
  todo: TaskT[];
  progress: TaskT[];
  done: TaskT[];
}