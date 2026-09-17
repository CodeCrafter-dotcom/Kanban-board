'use client'

import { columnIdT } from "@/types"
import Link from "next/link"
import Button from "../ui/Button/Button"
import { memo } from "react"
import { useContextActions } from "@/app/Context/TaskContext"

interface TaskProps {
    title: string
    columnId: columnIdT
    taskId: string
}

const Task = ({ title, columnId, taskId }: TaskProps) => {

    const { deleteTask } = useContextActions()

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/taskId', taskId)
        e.dataTransfer.setData('text/columnId', columnId)
    }

    return(
        <div
        draggable={true}
        onDragStart={handleDragStart}
        className="cursor-grab h-10 border border-black rounded-xl 
        flex justify-between items-center pl-1.5 py-2.5 will-change-transform active:cursor-grabbing"
        >   
            <Link href={`/${columnId}/${taskId}`} className="w-52.5 truncate ">{title}</Link>
            <Button 
            type="button"
            variant="deleteTaskButton"
            onClick={() => deleteTask(columnId, taskId)}
            >×</Button>
            <span 
            className="text-2xl font-bold relative after:content-[''] after:-translate-x-1/2 after:-translate-y-1/2
                    after:w-11 after:h-11 after:top-1/2 after:left-1/2 after:absolute border-l 
                    border-black h-10 flex justify-center items-center w-6"
            >⋮⋮</span>
        </div>
    )
}

export default memo(Task)