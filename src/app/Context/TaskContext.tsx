'use client'

import { BoardData, TaskT, columnIdT} from "@/types"
import { createContext, useCallback, useMemo, useState, useContext, useEffect, type ReactNode } from "react";
import { Dispatch, SetStateAction } from "react";

interface TaskProviderT {
    children: ReactNode
}

interface ContextDataT {
    tasks: BoardData
}

interface ContextActionsT {
    addTask: (nameTask: string) => void
    renameTask: (columnId: columnIdT, taskId: string, newNameTask: string) => void 
    deleteTask: (columnId: columnIdT, taskId: string) => void
    deleteColumnTask: (columnId: columnIdT) => void
    deleteAllTask: () => void
    setTasks: Dispatch<SetStateAction<BoardData>>
}

const ContextData = createContext<ContextDataT | null>(null)
const ContextActions = createContext<ContextActionsT | null>(null)

export const TaskProvider = ({ children }: TaskProviderT) => {

    const keyTask = 'tasks'
    
    const [tasks, setTasks] = useState<BoardData>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(keyTask);
                if (saved && saved.trim()) return JSON.parse(saved);
            } catch (error) {
                console.error(error);
            }
        }
        return { todo: [], progress: [], done: [] };
    })

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    useEffect(() => {
        if (!isMounted) return; 
        try {
            localStorage.setItem(keyTask, JSON.stringify(tasks));
        } catch (error) {
            console.error(error);
        }
    }, [tasks, isMounted])

    const addTask = useCallback((nameTask: string) => {
        const value = nameTask.trim()

        if (!value) return

        setTasks(prev => {
            const newTask: TaskT = {
                id: crypto.randomUUID(),
                title: value
            }
            return {...prev, todo: [...prev.todo, newTask]}
        })
    }, [])

    const renameTask = useCallback((columnId: columnIdT, taskId: string, newNameTask: string) => {
        const value = newNameTask.trim()

        if (!value) return

        setTasks(prev => (
            {
                ...prev, 
                [columnId]: prev[columnId].map(task => {
                    if(task.id === taskId) return {...task, title: value}
                    return task
            })}
        ))
    }, [])

    const deleteTask = useCallback((columnId: columnIdT, taskId: string) => {
        setTasks(prev => {
            if(!prev[columnId]) return prev

            return {
                ...prev,
                [columnId]: prev[columnId].filter(task => task.id !== taskId)
            }
        })
    }, [])

    const deleteColumnTask = useCallback((columnId: columnIdT) => {
        setTasks(prev => {
            if(!prev[columnId]) return prev

            return {
                ...prev,
                [columnId]: []
            }
        })
    }, [])

    const deleteAllTask = useCallback(() => {
        setTasks(() => {
            return {
                todo: [],
                progress: [],
                done: []
            }
        })
    }, [])

    const dataValue = useMemo(() => ({
        tasks
    }), [tasks])

    const actionsValue = useMemo(() => ({
        addTask,
        renameTask,
        deleteTask,
        deleteColumnTask,
        deleteAllTask, 
        setTasks
    }), [addTask, renameTask, deleteTask, deleteColumnTask, deleteAllTask, setTasks])

    if (!isMounted) {
        return null 
    }

    return(
        <ContextData.Provider value={dataValue}>
            <ContextActions.Provider value={actionsValue}>
                {children}
            </ContextActions.Provider>
        </ContextData.Provider>
    )
}

export const useContextData = (): ContextDataT => {
    const context: ContextDataT | null = useContext(ContextData)
    if (!context) throw new Error("useTasksActionsContext must be used within a TaskProvider")
    return context
}

export const useContextActions = (): ContextActionsT => {
    const context: ContextActionsT | null = useContext(ContextActions)
    if (!context) throw new Error("useTasksActionsContext must be used within a TaskProvider")
    return context
}