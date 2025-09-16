"use client"

import { useState, useCallback, DragEvent, useRef } from "react"
import { UploadCloud, File as FileIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (newFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)])
    }
  }, [])

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Necessary to allow dropping
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }
  
  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid gap-4">
      <div
        className={cn(
          "flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
        )}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={onButtonClick}
      >
        <UploadCloud className="w-12 h-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-semibold">
          Drag & drop files here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Attachments</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 border rounded-md bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <FileIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
