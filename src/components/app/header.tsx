import { Languages } from 'lucide-react';

export function Header() {
  return (
    <header className="p-4 flex items-center justify-center shrink-0">
      <Languages className="w-7 h-7 text-primary" />
      <h1 className="text-3xl font-bold text-primary ml-2 tracking-tight">VietSpeak</h1>
    </header>
  );
}
