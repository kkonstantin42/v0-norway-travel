'use client';

import { List, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className={`gap-2 ${view === 'list' ? 'bg-card text-foreground shadow-sm hover:bg-card' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List View</span>
      </Button>
      <Button
        variant={view === 'map' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('map')}
        className={`gap-2 ${view === 'map' ? 'bg-card text-foreground shadow-sm hover:bg-card' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Map className="w-4 h-4" />
        <span className="hidden sm:inline">Map View</span>
      </Button>
    </div>
  );
}
