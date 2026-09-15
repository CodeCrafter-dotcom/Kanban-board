'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { BoardData, TaskT, columnIdT, columnIds } from '@/types'

const filePath = path.join(process.cwd(), "todo-db.json")

export async function getBoardData(): Promise<BoardData> {
  try {
    const fileData = await fs.readFile(filePath, "utf-8")

    return JSON.parse(fileData)
  } catch (error) {
    return { todo: [], progress: [], done: [] };
  }
}

export async function saveBoardData(data: BoardData): Promise<boolean> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Ошибка при сохранении в JSON:", error);
    return false;
  }
}

export async function addTask(columnId: columnIdT, taskText: string) {
  if(!taskText.trim() || !taskText) return

  const data = await getBoardData()

  if (!data[columnId]) return

  const newTask: TaskT = {
    title: taskText,
    id: crypto.randomUUID()
  }

  data[columnId].push(newTask)

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  revalidatePath("/")
}

export async function deleteTask(columnId: columnIdT, taskId: string) {
  const data = await getBoardData()

  if (!data[columnId]) return

  data[columnId] = data[columnId].filter((item: TaskT) => item.id !== taskId)

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  revalidatePath("/")
}

export async function deleteAllTask() {
  const data = await getBoardData()

  data[columnIds.Todo] = []
  data[columnIds.Progress] = []
  data[columnIds.Done] = []

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  revalidatePath("/")
}

export async function deleteColumn(columnId: columnIdT) {
  const data = await getBoardData()

  if (!data[columnId]) return

  data[columnId] = []

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  revalidatePath("/")
}

export async function renameTask(columnId: columnIdT, taskId: string, newName: string) {
  const data = await getBoardData()

  if (!data[columnId]) return

  data[columnId] = data[columnId].map(task => {
    if(task.id === taskId) {
      return {...task, title: newName}
    }
    return task
  })

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  revalidatePath("/")
}