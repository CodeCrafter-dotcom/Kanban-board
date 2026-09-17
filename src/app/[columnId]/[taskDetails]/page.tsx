import TaskBody from "./TaskBody"
import { columnIdT } from "@/types"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit task",
  description: "Форма редактирования задачи. Здесь вы можете изменить название карточки"
}

interface TaskDetailsProps {
  params: Promise<{
    taskDetails: string
    columnId: columnIdT
  }>
}

export default async function Home({ params }: TaskDetailsProps) {

  const resolvedParams = await params

  return (
    <>
    <TaskBody columnId={resolvedParams.columnId} taskId={resolvedParams.taskDetails} />
    </>
  )
}