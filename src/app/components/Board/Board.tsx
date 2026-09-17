import { BoardData, columnIds, columnIdT } from "@/types"
import Column from "../Column/Column"
import { useCallback } from "react"
import { useContextActions } from "@/app/Context/TaskContext"

interface BoardProps {
    boardData: BoardData
}

const column1 = columnIds.Todo
const column2 = columnIds.Progress
const column3 = columnIds.Done

export default function Board({ boardData }: BoardProps) {

    const { setTasks } = useContextActions()

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => e.preventDefault(), [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetColumn: columnIdT) => {
        const taskId = e.dataTransfer.getData('text/taskId')
        const columnId = e.dataTransfer.getData('text/columnId') as columnIdT
    
        if (columnId === targetColumn) return
    
        const taskToMove = boardData[columnId].find(task => task.id === taskId)
        if (!taskToMove) return
    
        const updatedSourceCol = boardData[columnId].filter(task => task.id !== taskId)
        const updatedTargetCol = [...boardData[targetColumn], taskToMove]
    
        const updatedData = {
          ...boardData,
          [columnId]: updatedSourceCol,
          [targetColumn]: updatedTargetCol
        }

        setTasks(updatedData)
    }, [boardData, setTasks])

    const handleDropTodo = useCallback((e: React.DragEvent<HTMLDivElement>) => handleDrop(e, column1), [handleDrop])
    const handleDropProgress = useCallback((e: React.DragEvent<HTMLDivElement>) => handleDrop(e, column2), [handleDrop])
    const handleDropDone = useCallback((e: React.DragEvent<HTMLDivElement>) => handleDrop(e, column3), [handleDrop])

    return(
        <div className="flex  justify-between w-full px-5">
            <Column 
                onDragOver={handleDragOver} 
                onDrop={handleDropTodo} 
                title="In the plans" 
                tasks={boardData?.todo || []} 
                columnId={column1}/>
            <Column 
                onDragOver={handleDragOver} 
                onDrop={handleDropProgress} 
                title="In progress" 
                tasks={boardData?.progress || []} 
                columnId={column2}/>
            <Column 
                onDragOver={handleDragOver} 
                onDrop={handleDropDone} 
                title="Ready" 
                tasks={boardData?.done || []} 
                columnId={column3}/>
        </div>
    )
}