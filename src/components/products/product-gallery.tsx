"use client"

import { useState } from "react"
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const goNext = () => setSelectedIndex((i) => (i + 1) % images.length)
  const goPrev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length)

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center text-muted-foreground">
        No images available
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={isZoomed ? handleMouseMove : undefined}
            style={
              isZoomed
                ? {
                    cursor: "zoom-out",
                    backgroundImage: `url(${images[selectedIndex]})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : undefined
            }
          >
            {!isZoomed && (
              <img
                src={images[selectedIndex]}
                alt={`${name} - Image ${selectedIndex + 1}`}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {!isZoomed && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/50 p-1.5">
            <ZoomIn className="h-4 w-4 text-white" />
          </div>
        )}

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-black/60 dark:hover:bg-black/80"
              onClick={goPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-black/60 dark:hover:bg-black/80"
              onClick={goNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index)
                setIsZoomed(false)
              }}
              className={cn(
                "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                selectedIndex === index
                  ? "border-red-500 ring-2 ring-red-500/20"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
