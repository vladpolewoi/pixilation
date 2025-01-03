'use client';

import { useAnimationStore } from '@/entities/pixel/model/store';
import { Slider } from '@/shared/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

export function ConfigPanel() {
  const config = useAnimationStore((state) => state.config);
  const updateConfig = useAnimationStore((state) => state.updateConfig);

  return (
    <div className="flex flex-col gap-4 mt-4 w-full max-w-md">
      <TooltipProvider>
        <div className="space-y-2">
          <label className="text-sm text-mocha-text">Speed</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Slider
                value={[config.speed]}
                onValueChange={([value]) => updateConfig({ speed: value })}
                min={0}
                max={50}
                step={1}
                className="w-full"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Update delay: {Math.floor(5000 - (config.speed * 99))}ms</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-mocha-text">Variation</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Slider
                value={[config.triggerVariation]}
                onValueChange={([value]) => updateConfig({ triggerVariation: value })}
                min={0}
                max={500}
                step={10}
                className="w-full"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Random variation: ±{config.triggerVariation}ms</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-mocha-text">Initial Delay</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Slider
                value={[config.initialDelay]}
                onValueChange={([value]) => updateConfig({ initialDelay: value })}
                min={0}
                max={1000}
                step={50}
                className="w-full"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Start delay: {config.initialDelay}ms</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-mocha-text">Visibility Chance</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Slider
                value={[config.visibilityThreshold * 100]}
                onValueChange={([value]) => updateConfig({ visibilityThreshold: value / 100 })}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Chance: {100 - Math.floor(config.visibilityThreshold * 100)}%</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
} 