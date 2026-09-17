'use client'

import Board from "../Board/Board";
import Header from "../../layout/Header/Header";
import { useContextData } from "../../Context/TaskContext";

export default function KanbanWorkspace() {
  const { tasks } = useContextData();

  return (
    <div className="grid gap-5">
      <Header boardData={tasks}/>
      <Board boardData={tasks}/>
    </div>
  )
}
