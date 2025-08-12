import { Flame, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  onSavedListClick: () => void;
  savedCount: number;
}

export function Header({ onSavedListClick, savedCount }: HeaderProps) {
  return (
    <header className="p-4 flex items-center justify-between shrink-0">
      <div className="flex items-center">
        <Flame className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold text-primary ml-2 tracking-tight">idioViet</h1>
      </div>
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={onSavedListClick} aria-label="Open saved idioms list">
          <Bookmark className="w-7 h-7 text-primary" />
        </Button>
        {savedCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center pointer-events-none">
            {savedCount}
          </div>
        )}
      </div>
    </header>
  );
}
