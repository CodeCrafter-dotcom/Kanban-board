'use client'

import Link from "next/link"
import { useState, use } from "react"
import { BoardData, columnIdT } from "@/types"
import EditTask from "@/app/components/EditTask/EditTask"

interface TaskDetailsProps {
    params: Promise<{taskDetails: string; columnId: columnIdT}>
    data: BoardData
}

export default  function TaskBody ({ params, data }: TaskDetailsProps) {

    const { taskDetails, columnId } = use(params)

    const [activeDialog, setActiveDialog] = useState<boolean>(false)

    const allTasks = [...(data.todo || []), ...(data.progress || []), ...(data.done || [])]
    const currentTask = allTasks.find(task => task.id === taskDetails)

    if (!currentTask) {
        console.log('not found')
        return
    }

    return (
        <div className="p-6 max-w-md mx-auto border border-black rounded-xl mt-10">
            <div className="flex justify-between">
                <Link href="/" type="button">← Back</Link>
                <button type="button" onClick={() => setActiveDialog(true)}>edit</button>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Task details</h1>
            
            <div className="grid gap-2">
                <p><strong>ID:</strong> {currentTask.id}</p>
                <p className="w-[320px] wrap-break-word"><strong>Name:</strong> {currentTask.title}</p>
            </div>

            {activeDialog && (
                <EditTask
                  onClose={() => setActiveDialog(false)}
                  isOpen={activeDialog}
                  columnId={columnId}
                  taskId={taskDetails}
                />
            )}
        </div>
    )
}