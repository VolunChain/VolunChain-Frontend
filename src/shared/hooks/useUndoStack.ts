import { useCallback, useRef, useState } from 'react';


interface UndoStack<T> {

    value: T
    set: (newValue: T) => void
    undo: () => void
    redo: () => void
    reset: () => void
    canUndo: boolean
    canRedo: boolean

}

export function useUndoStack<T> (
    initialValue: T,
    maxHistory: number = 50
): UndoStack<T> {
    const [present, setPresent] = useState<T>(initialValue)
    const pastRef = useRef<T[]>([])
    const futureRef = useRef<T[]>([])

    const set = useCallback((newValue: T) => {
        pastRef.current = [...pastRef.current, present].slice(-maxHistory)
        setPresent(newValue)
        futureRef.current = []
        
    }, [present, maxHistory])

    const undo = useCallback(() => {
        if (pastRef.current.length === 0) return 

        const previous = pastRef.current[pastRef.current.length - 1]
        const newPast = pastRef.current.slice(0, -1)
        futureRef.current = [present, ...futureRef.current]
        pastRef.current = newPast
        setPresent(previous)
    }, [present])

    const redo = useCallback(() => {
        if (futureRef.current.length === 0) return

        const next = futureRef.current[0]
        const newFuture = futureRef.current.slice(1)
        pastRef.current = [...pastRef.current, present].slice(-maxHistory)
        futureRef.current = newFuture
        setPresent(next)
    }, [present, maxHistory])

    const reset = useCallback(() => {
        pastRef.current = []
        futureRef.current = []
        setPresent(initialValue)
    }, [initialValue])

    return {
        value: present,
        set,
        undo,
        redo,
        reset,
        canUndo: pastRef.current.length > 0,
        canRedo: futureRef.current.length > 0
    }
}