'use client';

import { useAnimationStore } from '@/entities/pixel/model/store';
import { Button } from '@/shared/ui';
import { ColorPicker } from '@/shared/ui/color-picker';
import { Pause, Play } from 'lucide-react';
import { catppuccinColorGrid } from '@/entities/pixel/lib/colors';
import { ConfigPanel } from './config-panel';

const colorOptions = catppuccinColorGrid.map(row => 
  row.map(color => ({
    value: color,
    className: color,
  }))
);

export function ControlPanel() {
  const { isPlaying, togglePlaying, selectedColor, setSelectedColor } = useAnimationStore();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlaying}
          className="w-12 h-12 rounded-full bg-mocha-surface0/50 border-mocha-blue/20 hover:bg-mocha-surface0/70 hover:border-mocha-blue/40"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-mocha-blue" />
          ) : (
            <Play className="h-5 w-5 text-mocha-blue ml-0.5" />
          )}
        </Button>
        <ColorPicker
          colors={colorOptions}
          value={selectedColor}
          onValueChange={setSelectedColor}
        />
      </div>
      <ConfigPanel />
    </div>
  );
} 