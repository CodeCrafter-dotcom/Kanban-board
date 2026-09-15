import TaskBody from "./TaskBody"
import { BoardData, columnIdT } from "@/types"
import { getBoardData } from "../../actions"
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

  const data: BoardData = await getBoardData()

  return (
    <>
    <TaskBody params={params} data={data}/>
    </>
  )
}