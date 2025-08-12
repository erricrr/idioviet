
"use client";

import { useState } from "react";
import type { Idiom } from "@/data/idioms";
import { IdiomCard } from "./idiom-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Bookmark, MessageCircle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

interface SavedIdiomsListProps {
  idioms: Idiom[];
  savedIdiomIds: Set<number>;
  onSaveToggle: (id: number) => void;
  view: "list" | "carousel";
}

export function SavedIdiomsList({
  idioms,
  savedIdiomIds,
  onSaveToggle,
  view,
}: SavedIdiomsListProps) {
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (view === "carousel") {
    return (
      <Carousel className="w-full max-w-lg" opts={{ loop: true }}>
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
    );
  }

  if (idioms.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center p-8 border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Saved Idioms</h2>
            <p className="text-muted-foreground">
              You haven't saved any idioms yet. Tap the bookmark icon on a card to
              add it here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSelectIdiom = (idiom: Idiom) => {
    setSelectedIdiom(idiom);
    setIsSheetOpen(false);
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 h-full">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full max-w-md">
            <Menu className="w-5 h-5 mr-2" />
            My Saved List
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
           <SheetHeader>
            <SheetTitle className="text-primary text-2xl">Saved Idioms</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100%-4rem)] mt-4">
            <div className="flex flex-col gap-2 pr-4">
              {idioms.map((idiom) => (
                <div
                  key={idiom.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                    selectedIdiom?.id === idiom.id
                      ? "bg-primary/20"
                      : "bg-card-foreground/5 hover:bg-card-foreground/10"
                  )}
                  onClick={() => handleSelectIdiom(idiom)}
                >
                  <span className="font-medium">{idiom.phrase}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-grow flex items-center justify-center">
        {selectedIdiom ? (
          <IdiomCard
            idiom={selectedIdiom}
            isSaved={savedIdiomIds.has(selectedIdiom.id)}
            onSaveToggle={onSaveToggle}
          />
        ) : (
          <div className="text-center text-muted-foreground p-8">
            <MessageCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Select an Idiom</h2>
            <p>
              Tap the button above to open your list and select a saved idiom to
              practice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
