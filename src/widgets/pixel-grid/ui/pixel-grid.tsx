'use client';

import { PixelBox } from '@/entities/pixel';
import { useAnimationStore } from '@/entities/pixel/model/store';
import { useEffect, useState } from 'react';

export function PixelGrid() {
  const pixels = Array(256).fill(null);
  const lockedPositions = useAnimationStore((state) => state.lockedPositions);
  const selectedColor = useAnimationStore((state) => state.selectedColor);
  const [isComplete, setIsComplete] = useState(false);

  // Check if all pixels are filled with selected color
  useEffect(() => {
    if (!selectedColor) {
      setIsComplete(false);
      return;
    }
    setIsComplete(lockedPositions.size === pixels.length);
  }, [lockedPositions.size, selectedColor, pixels.length]);

  return (
    <div className={`relative transition-all duration-1000 rounded-2xl overflow-hidden
      ${isComplete ? 'bg-gradient-to-r from-mocha-green/50 to-mocha-teal/50 animate-pulse' : ''}
    `}>
      <div className="grid grid-cols-16">
        {pixels.map((_, i) => (
          <PixelBox key={i} position={i} isVisible={false} />
        ))}
      </div>
    </div>
  );
} 