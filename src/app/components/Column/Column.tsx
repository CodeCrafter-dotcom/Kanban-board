'use client'

import Task from "../Task/Task"
import { columnIdT, TaskT } from "@/types"
import Button from "../ui/Button/Button"
import { memo } from "react"
import { useContextActions } from "@/app/Context/TaskContext"

interface ColumnProps{
    title: string
    tasks: TaskT[]
    columnId: columnIdT
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

const Column = ({ title, tasks, columnId, onDragOver, onDrop }: ColumnProps) => {

    const { deleteColumnTask } = useContextActions()

    const handleColumnDelete = () => {
        if(columnId.length === 0) return

        deleteColumnTask(columnId)
    }

    return(
        <div 
        onDragOver={onDragOver} 
        className="grid gap-8 content-start border border-black py-5 px-8 rounded-xl w-88.75 h-125 overflow-hidden"
        onDrop={onDrop}
        >
            <div className="flex justify-between gap-2.5 items-center">
                <h2 className="text-2xl font-bold whitespace-nowrap">{title}</h2>
                <Button 
                onClick={handleColumnDelete} 
                type="button" 
                variant="deleteColumnButton"
                >
                Clear column
                </Button>
                <span className="text-xl font-semibold">{tasks ? tasks.length : 0}</span>
            </div>
            <div className="flex flex-col pb-1 gap-2.5 overflow-y-auto scrollbar-none overflow-x-hidden overscroll-contain">
                {tasks.map((item) => (
                    <Task key={item.id} title={item.title} taskId={item.id} columnId={columnId}/>
                ))}
            </div>
        </div>
    )
}

export default memo(Column)