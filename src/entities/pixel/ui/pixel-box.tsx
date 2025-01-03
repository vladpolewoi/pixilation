'use client';

import { usePixelAnimation } from '../lib/use-pixel-animation';

interface PixelBoxProps {
  isVisible: boolean;
  position: number;
}

export function PixelBox({ isVisible, position }: PixelBoxProps) {
  const { isVisible: visible, currentColor } = usePixelAnimation(isVisible, position);

  return (
    <div
      className={`w-3 h-3 transition-colors duration-600
        ${visible ? currentColor : 'bg-transparent'}`}
    />
  );
} 