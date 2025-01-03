import { useState, useEffect, useCallback } from 'react';
import { useAnimationStore } from '../model/store';
import { getRandomColor } from './colors';

export function usePixelAnimation(initialVisible: boolean, position: number) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const isPlaying = useAnimationStore((state) => state.isPlaying);
  const selectedColor = useAnimationStore((state) => state.selectedColor);
  const config = useAnimationStore((state) => state.config);
  const lockPosition = useAnimationStore((state) => state.lockPosition);
  const unlockPosition = useAnimationStore((state) => state.unlockPosition);
  const lockedPositions = useAnimationStore((state) => state.lockedPositions);
  
  // Convert speed value (0-50) to base delay in ms (5000-20)
  const getDelay = useCallback((speed: number) => {
    const baseDelay = Math.floor(5000 - (speed * 99));
    const variation = (Math.random() * 2 - 1) * config.triggerVariation;
    return Math.max(20, baseDelay + variation);
  }, [config.triggerVariation]);
  
  // Memoize the animation tick to prevent recreating it on each render
  const tick = useCallback(() => {
    if (!isPlaying) return null;

    // If position is locked, keep it visible with selected color
    if (lockedPositions.has(position)) {
      return getDelay(config.speed);
    }

    // If we're visible with the selected color, lock it
    if (selectedColor && currentColor === selectedColor && isVisible) {
      lockPosition(position);
      return getDelay(config.speed);
    }

    // Otherwise, continue animating
    const willBeVisible = Math.random() > config.visibilityThreshold;
    setIsVisible(willBeVisible);
    
    if (willBeVisible) {
      const useSelectedColor = selectedColor && Math.random() > 0.8;
      const newColor = useSelectedColor ? selectedColor : getRandomColor(selectedColor);
      setCurrentColor(newColor);
    }

    return getDelay(config.speed);
  }, [isPlaying, selectedColor, currentColor, isVisible, position, lockPosition, config, getDelay, lockedPositions]);

  useEffect(() => {
    if (!isPlaying) return;

    const animate = () => {
      const nextDelay = tick();
      if (nextDelay !== null) {
        timeout = setTimeout(animate, nextDelay);
      }
    };

    let timeout = setTimeout(animate, Math.random() * config.initialDelay);
    return () => clearTimeout(timeout);
  }, [isPlaying, tick, config.initialDelay]);

  // Reset when selected color changes
  useEffect(() => {
    if (selectedColor === null) {
      setCurrentColor(getRandomColor());
      unlockPosition(position);
    }
  }, [selectedColor, position, unlockPosition]);

  return { isVisible, currentColor };
} 