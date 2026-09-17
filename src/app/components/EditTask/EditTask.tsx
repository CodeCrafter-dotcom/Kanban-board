'use client'

import { columnIdT } from "@/types"
import { useEffect, useRef, useState } from "react"
import Button from "../ui/Button/Button"
import { useContextActions } from "@/app/Context/TaskContext"

interface AddTaskProps {
    isOpen: boolean
    onClose: () => void 
    columnId: columnIdT
    taskId: string
}

export default function EditTask({ onClose, isOpen, columnId, taskId }: AddTaskProps) {

    const { renameTask } = useContextActions()

    const dialogRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputError, setInputError] = useState<boolean>(false)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return;

        if (isOpen) {
          dialog.showModal()
          
          requestAnimationFrame(() => {
            inputRef.current?.focus()
        })
        } else {
          dialog.close()   
        }
    }, [isOpen])

    return(
        <dialog
            onClose={onClose}
            ref={dialogRef}
            className="fixed grid gap-4 m-auto py-5 px-6 border-gray-500 border rounded-xl w-80"
                >
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold">Edit task</p>
    
                    <Button 
                    type="button" 
                    variant="closeButton"
                    onClick={onClose}
                    >
                    ×
                    </Button>
                </div>
                <form
                action={(formData) => {
                const text = formData.get("taskTextEdit") as string
                    if (!text || text.trim().length === 0) {
                        setInputError(true)
                        inputRef.current?.focus()

                        setTimeout(() => {
                            setInputError(false)
                        }, 3000)
                    } else {
                        setInputError(false)
                        
                        renameTask(columnId, taskId, text)
                    
                        onClose()
                    }
                }}
                className="grid gap-4 content-between h-full w-full">
        
                <input 
                ref={inputRef}
                type="text" 
                className={`${inputError ? 'border-red-600' : ''} font-semibold pl-2 border-3 rounded-xl border-gray-500 outline-none h-11`} 
                placeholder="Edit task"
                name="taskTextEdit"
                />
                <Button 
                variant="actionButton"
                type="submit" 
                >Edit</Button>
            </form>
        </dialog>
    )
}