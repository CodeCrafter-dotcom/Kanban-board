'use client'

import { useState } from "react";
import AddTask from "../../components/AddTask/AddTask"
import { deleteAllTask } from "@/app/actions";
import { BoardData } from "@/types";
import Button from "@/app/components/ui/Button/Button";

interface BoardProps {
    boardData: BoardData
}

export default function Header({ boardData }: BoardProps) {

    const [activeDialog, setActiveDialog] = useState<boolean>(false)

    const handleDelete = () => {
        if(boardData.todo.length === 0 && boardData.progress.length === 0 && boardData.done.length === 0) return

        const agreement = confirm('Do you really want to delete all tasks?')

        if(agreement) deleteAllTask()
    }

    return(
        <header className="flex justify-center items-center gap-12">
            <h1 className="text-center font-bold text-2xl">Home</h1>

            <Button 
            type="button" 
            onClick={() => setActiveDialog(true)}
            variant="baseWhiteButton"
            >
            + Add a task
            </Button>

            <Button 
            type="button" 
            onClick={handleDelete}
            variant="baseBlackButton"
            >
            - Delete all task
            </Button>

            {activeDialog && (
                <AddTask
                  onClose={() => setActiveDialog(false)}
                  isOpen={activeDialog}
                />
            )}
        </header>
    )
}