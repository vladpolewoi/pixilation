'use client';

import { PixelGrid } from '@/widgets/pixel-grid';
import { ControlPanel } from '@/widgets/control-panel';

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-mocha-text">Pixilation</h1>
      <div className="flex flex-col items-center gap-8">
        <div className='p-4 bg-mocha-surface0 rounded-3xl'>

        <PixelGrid />
        </div>
        <ControlPanel />
      </div>
    </main>
  );
} 