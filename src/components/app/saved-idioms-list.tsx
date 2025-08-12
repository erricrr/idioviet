
"use client";

import type { Idiom } from "@/data/idioms";
import { ScrollArea } from "../ui/scroll-area";
import { Bookmark, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface SavedIdiomsListProps {
  idioms: Idiom[];
  onSelectIdiom: (id: number) => void;
  isSheetOpen: boolean;
  onSheetOpenChange: (isOpen: boolean) => void;
}

export function SavedIdiomsList({
  idioms,
  onSelectIdiom,
  isSheetOpen,
  onSheetOpenChange,
}: SavedIdiomsListProps) {
  const handleSelectIdiom = (idiom: Idiom) => {
    onSelectIdiom(idiom.id);
    onSheetOpenChange(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={onSheetOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-primary text-2xl flex items-center gap-2">
            <Bookmark /> Saved Idioms
          </SheetTitle>
        </SheetHeader>
        {idioms.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-8">
             <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <MessageCircle className="w-16 h-16" />
              <h2 className="text-xl font-semibold">No Saved Idioms</h2>
              <p>
                Tap the bookmark icon on a card to add it here for later
                review.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-4rem)] mt-4">
            <div className="flex flex-col gap-2 pr-4">
              {idioms.map((idiom) => (
                <div
                  key={idiom.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                    "bg-card-foreground/5 hover:bg-primary/10"
                  )}
                  onClick={() => handleSelectIdiom(idiom)}
                >
                  <span className="font-medium">{idiom.phrase}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
