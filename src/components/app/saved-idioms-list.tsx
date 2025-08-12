
"use client";

import type { Idiom } from "@/data/idioms";
import { ScrollArea } from "../ui/scroll-area";
import { Bookmark, MessageCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { IdiomCard } from "./idiom-card";

interface SavedIdiomsListProps {
  idioms: Idiom[];
  onSelectIdiom: (id: number) => void;
  isSheetOpen: boolean;
  onSheetOpenChange: (isOpen: boolean) => void;
  savedIdiomIds: Set<number>;
  onSaveToggle: (id: number) => void;
}

export function SavedIdiomsList({
  idioms,
  onSelectIdiom,
  isSheetOpen,
  onSheetOpenChange,
  savedIdiomIds,
  onSaveToggle,
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
          <>
            <div className="p-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Review All Saved
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] md:max-w-lg p-0 border-none">
                   <DialogHeader className="hidden">
                    <DialogTitle>Review All Saved Idioms</DialogTitle>
                  </DialogHeader>
                  <Carousel opts={{ loop: true }} className="w-full">
                    <CarouselContent>
                      {idioms.map((idiom) => (
                        <CarouselItem key={idiom.id}>
                          <div className="p-1">
                            <IdiomCard
                              idiom={idiom}
                              isSaved={savedIdiomIds.has(idiom.id)}
                              onSaveToggle={onSaveToggle}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-[-8px] md:ml-[-24px]" />
                    <CarouselNext className="mr-[-8px] md:mr-[-24px]" />
                  </Carousel>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[calc(100%-4rem-56px)] mt-0">
              <div className="flex flex-col gap-2 px-4 pb-4">
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
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
