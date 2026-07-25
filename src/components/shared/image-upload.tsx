"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import {
  UploadIcon,
  XIcon,
  FileImageIcon,
  Loader2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string[]
  onChange?: (urls: string[]) => void
  maxFiles?: number
  maxSizeMB?: number
  accept?: string
  className?: string
  disabled?: boolean
}

interface UploadedFile {
  id: string
  file: File
  preview: string
  progress: number
  error?: string
}

let fileIdCounter = 0

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  accept = "image/*",
  className,
  disabled = false,
}: ImageUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | undefined => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File exceeds ${maxSizeMB}MB limit`
    }
    if (!file.type.startsWith("image/")) {
      return "Only image files are accepted"
    }
    return undefined
  }

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles = Array.from(fileList)
      const remaining = maxFiles - value.length - files.length
      const toAdd = newFiles.slice(0, Math.max(0, remaining))

      const processed: UploadedFile[] = toAdd.map((file) => {
        const id = `file-${++fileIdCounter}`
        const error = validateFile(file)
        return {
          id,
          file,
          preview: URL.createObjectURL(file),
          progress: error ? 0 : 100,
          error,
        }
      })

      setFiles((prev) => {
        const updated = [...prev, ...processed]
        const validUrls = updated
          .filter((f) => !f.error)
          .map((f) => f.preview)
        onChange?.([...value, ...validUrls])
        return updated
      })
    },
    [maxFiles, value, files.length, maxSizeMB, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      if (e.dataTransfer.files.length) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles, disabled]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id)
        if (file) URL.revokeObjectURL(file.preview)
        const updated = prev.filter((f) => f.id !== id)
        const validUrls = updated
          .filter((f) => !f.error)
          .map((f) => f.preview)
        onChange?.([...value, ...validUrls])
        return updated
      })
    },
    [value, onChange]
  )

  const removeExisting = useCallback(
    (index: number) => {
      const updated = value.filter((_, i) => i !== index)
      onChange?.(updated)
    },
    [value, onChange]
  )

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <UploadIcon className="size-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">
          Drop images here or click to upload
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Max {maxFiles} images, up to {maxSizeMB}MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files)
            e.target.value = ""
          }}
          disabled={disabled}
        />
      </div>

      {(value.length > 0 || files.length > 0) && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={`existing-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <Button
                variant="destructive"
                size="icon-xs"
                className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  removeExisting(index)
                }}
              >
                <XIcon className="size-3" />
              </Button>
            </div>
          ))}

          {files.map((file) => (
            <div
              key={file.id}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-lg border bg-muted",
                file.error && "border-destructive"
              )}
            >
              {file.error ? (
                <div className="flex size-full flex-col items-center justify-center gap-1 p-2">
                  <FileImageIcon className="size-6 text-destructive" />
                  <p className="text-center text-xs text-destructive">
                    {file.error}
                  </p>
                </div>
              ) : (
                <>
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {file.progress < 100 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2Icon className="size-6 animate-spin text-white" />
                    </div>
                  )}
                </>
              )}
              <Button
                variant="destructive"
                size="icon-xs"
                className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(file.id)
                }}
              >
                <XIcon className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
