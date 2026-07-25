"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Storage full or blocked
    }
  }, [key, storedValue])

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const nextValue = value instanceof Function ? value(prev) : value
      return nextValue
    })
  }, [])

  const removeValue = useCallback(() => {
    setStoredValue(initialValue)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
