"use client"

import * as React from "react"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { X } from "lucide-react"

export interface ColorOption {
  value: string
  className: string
}

interface ColorPickerProps {
  colors: ColorOption[][]
  value?: string | null
  onValueChange?: (value: string | null) => void
}

export function ColorPicker({
  colors,
  value,
  onValueChange,
}: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-mocha-surface0/50 border-mocha-blue/20 hover:bg-mocha-surface0/70 hover:border-mocha-blue/40"
        >
          <div className={`w-5 h-5 rounded-md ${value || 'bg-mocha-blue'}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[280px] p-0 bg-mocha-base border-mocha-surface1 rounded-lg shadow-2xl" 
        align="start"
        sideOffset={5}
      >
        <div className="border-b border-mocha-surface1">
          <div className="grid grid-cols-2">
            <button className="h-9 text-sm text-mocha-text border-r border-mocha-surface1 hover:bg-mocha-surface0/50">
              Colors
            </button>
            <button className="h-9 text-sm text-mocha-subtext1 hover:bg-mocha-surface0/50">
              Emoji
            </button>
          </div>
        </div>
        <div className="p-2">
          <div className="grid grid-cols-8 gap-1">
            {colors[0].map((color) => (
              <button
                key={color.value}
                onClick={() => onValueChange?.(color.value === 'none' ? null : color.value)}
                className={`w-8 h-8 rounded-lg transition-all hover:scale-105 relative
                  ${color.value === 'none' 
                    ? 'bg-mocha-base border border-mocha-surface1' 
                    : color.className}
                  ${value === color.value ? 'ring-2 ring-mocha-blue ring-offset-2 ring-offset-mocha-base' : ''}`}
              >
                {color.value === 'none' && (
                  <X className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-mocha-surface1" />
                )}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-8 gap-1 mt-1">
            {colors[1].map((color) => (
              <button
                key={color.value}
                onClick={() => onValueChange?.(color.value)}
                className={`w-8 h-8 rounded-lg ${color.className} transition-all hover:scale-105
                  ${value === color.value ? 'ring-2 ring-mocha-blue ring-offset-2 ring-offset-mocha-base' : ''}`}
              />
            ))}
            {/* Add empty slots to complete the grid */}
            {Array(8 - colors[1].length).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="w-8 h-8" />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 