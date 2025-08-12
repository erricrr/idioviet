import { Smartphone } from 'lucide-react';

export function MobileOnlyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:hidden h-full">
        {children}
      </div>
      <div className="hidden md:flex flex-col items-center justify-center h-screen bg-background text-foreground p-8 text-center">
        <Smartphone className="w-16 h-16 mb-4 text-primary" />
        <h1 className="text-2xl font-bold mb-2">Mobile Experience Recommended</h1>
        <p className="max-w-md text-muted-foreground">
          For the best experience, including audio recording features, please view this application on a mobile device.
        </p>
      </div>
    </>
  );
}
