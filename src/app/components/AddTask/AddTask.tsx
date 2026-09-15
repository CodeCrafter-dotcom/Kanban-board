'use client'

import { addTask } from "@/app/actions"
import { useRef, useEffect, useState } from "react"
import Button from "../ui/Button/Button"

interface AddTaskProps {
    isOpen: boolean
    onClose: () => void
}

export default function AddTask({ onClose, isOpen }: AddTaskProps) {

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
                <p className="text-2xl font-semibold">Create new task</p>

                <Button 
                type="button" 
                variant="closeButton"
                onClick={onClose}
                >
                ×
                </Button>
            </div>
            <form 
            action={async (formData) => {
                const text = formData.get("taskText") as string
                if (!text || text.trim().length === 0) {
                    setInputError(true)
                    inputRef.current?.focus()

                    setTimeout(() => {
                        setInputError(false)
                    }, 3000)
                } else {
                    setInputError(false)
                    await addTask("todo", text)
                
                    onClose()
                }
            }}  
            className="grid gap-4 content-between h-full w-full">

                <input 
                ref={inputRef}
                type="text" 
                className={`${inputError ? 'border-red-600' : ''} font-semibold pl-2 border-3 rounded-xl border-gray-500 outline-none h-11`} 
                placeholder="Add task"
                name="taskText"
                />
                <Button 
                variant="actionButton"
                type="submit" 
                >Create</Button>
            </form>
        </dialog>
    )
}