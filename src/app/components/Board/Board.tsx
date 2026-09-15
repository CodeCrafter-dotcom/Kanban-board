'use client'

import { BoardData, columnIds, columnIdT } from "@/types"
import Column from "../Column/Column"
import { useState, useEffect, useCallback } from "react"
import { saveBoardData } from "@/app/actions"

interface BoardProps {
    boardData: BoardData
}

const column1 = columnIds.Todo
const column2 = columnIds.Progress
const column3 = columnIds.Done

export default function Board({ boardData }: BoardProps) {

    const [boardDataState, setBoardDataState] = useState<BoardData>(boardData)

    useEffect(() => {
        setBoardDataState(boardData)
    }, [boardData])

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => e.preventDefault(), [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, targetColumn: columnIdT) => {
        const taskId = e.dataTransfer.getData('text/taskId')
        const columnId = e.dataTransfer.getData('text/columnId') as columnIdT
    
        if (columnId === targetColumn) return
    
        const taskToMove = boardDataState[columnId].find(task => task.id === taskId)
        if (!taskToMove) return
    
        const updatedSourceCol = boardDataState[columnId].filter(task => task.id !== taskId)
        const updatedTargetCol = [...boardDataState[targetColumn], taskToMove]
    
        const updatedData = {
          ...boardDataState,
          [columnId]: updatedSourceCol,
          [targetColumn]: updatedTargetCol
        }

        setBoardDataState(updatedData)
        saveBoardData(updatedData)
    }, [boardDataState])

    const handleDropTodo = useCallback((e: React.DragEvent<HTMLDivElement>) => handleDrop(e, column1), [handleDrop])
    const handleDropProgress = useCallback((e: React.DragEvent<HTMLDivElement>) => handleDrop(e, column2), [handleDrop])
    const handleDropDone = useCallback((e: React.DragEvent<HTMLDivElement>) => handleDrop(e, column3), [handleDrop])

    return(
        <div className="flex  justify-between w-full px-5">
            <Column 
                onDragOver={handleDragOver} 
                onDrop={handleDropTodo} 
                title="In the plans" 
                tasks={boardDataState.todo} 
                columnId={column1}/>
            <Column 
                onDragOver={handleDragOver} 
                onDrop={handleDropProgress} 
                title="In progress" 
                tasks={boardDataState.progress} 
                columnId={column2}/>
            <Column 
                onDragOver={handleDragOver} 
                onDrop={handleDropDone} 
                title="Ready" 
                tasks={boardDataState.done} 
                columnId={column3}/>
        </div>
    )
}