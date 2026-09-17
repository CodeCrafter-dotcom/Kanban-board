import { BoardData, columnIds, columnIdT } from "@/types"
import Column from "../Column/Column"
import { useCallback } from "react"
import { useContextActions, useContextData } from "@/app/Context/TaskContext"

interface BoardProps {
    boardData: BoardData
}

const column1 = columnIds.Todo
const column2 = columnIds.Progress
const column3 = columnIds.Done

export default function Board({ boardData }: BoardProps) {

    const { activeTaskId, sourceColumnId } = useContextData()
    const { setTasks } = useContextActions()

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => e.preventDefault(), [])

    const handleDrop = useCallback((targetColumn: columnIdT) => {
    
        if (!activeTaskId || !sourceColumnId || sourceColumnId === targetColumn) return
    
        const taskToMove = boardData[sourceColumnId].find(task => task.id === activeTaskId)
        if (!taskToMove) return
    
        const updatedSourceCol = boardData[sourceColumnId].filter(task => task.id !== activeTaskId)
        const updatedTargetCol = [...boardData[targetColumn], taskToMove]
    
        const updatedData = {
          ...boardData,
          [sourceColumnId]: updatedSourceCol,
          [targetColumn]: updatedTargetCol
        }

        setTasks(updatedData)
    }, [boardData, setTasks, activeTaskId, sourceColumnId])

    const handleDropTodo = useCallback(() => handleDrop(column1), [handleDrop])
    const handleDropProgress = useCallback(() => handleDrop(column2), [handleDrop])
    const handleDropDone = useCallback(() => handleDrop(column3), [handleDrop])

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