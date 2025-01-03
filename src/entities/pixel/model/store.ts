import { create } from 'zustand';
import { catppuccinColors } from '../lib/colors';

interface AnimationConfig {
  speed: number;
  triggerVariation: number;
  initialDelay: number;
  visibilityThreshold: number;
}

interface AnimationState {
  isPlaying: boolean;
  selectedColor: string | null;
  lockedPositions: Set<number>;
  config: AnimationConfig;
  togglePlaying: () => void;
  setSelectedColor: (color: string | null) => void;
  lockPosition: (position: number) => void;
  unlockPosition: (position: number) => void;
  clearLockedPositions: () => void;
  updateConfig: (config: Partial<AnimationConfig>) => void;
}

const DEFAULT_CONFIG: AnimationConfig = {
  speed: 25,
  triggerVariation: 200,
  initialDelay: 200,
  visibilityThreshold: 0.2,
};

export const useAnimationStore = create<AnimationState>((set) => ({
  isPlaying: true,
  selectedColor: null,
  lockedPositions: new Set(),
  config: DEFAULT_CONFIG,
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSelectedColor: (color) => {
    set({ selectedColor: color, lockedPositions: new Set() });
  },
  lockPosition: (position) => set((state) => ({
    lockedPositions: new Set(Array.from(state.lockedPositions).concat(position))
  })),
  unlockPosition: (position) => set((state) => {
    const newLocked = new Set(Array.from(state.lockedPositions));
    newLocked.delete(position);
    return { lockedPositions: newLocked };
  }),
  clearLockedPositions: () => set({ lockedPositions: new Set() }),
  updateConfig: (config) => set((state) => ({
    config: { ...state.config, ...config }
  })),
})); 