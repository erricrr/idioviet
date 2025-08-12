
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
import { Bookmark, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | null>(
    idioms.length > 0 ? idioms[0] : null
  );

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
  
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 h-[calc(100vh-200px)]">
        <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-2 text-center md:text-left">Your Saved Idioms</h2>
            <ScrollArea className="h-full pr-4">
                 <div className="flex flex-col gap-2">
                    {idioms.map((idiom) => (
                        <div
                            key={idiom.id}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                                selectedIdiom?.id === idiom.id ? "bg-primary/20" : "bg-card-foreground/5 hover:bg-card-foreground/10"
                            )}
                            onClick={() => setSelectedIdiom(idiom)}
                        >
                            <span className="font-medium">{idiom.phrase}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
        <div className="w-full md:w-2/3 flex items-center justify-center">
            {selectedIdiom ? (
                 <IdiomCard
                    idiom={selectedIdiom}
                    isSaved={savedIdiomIds.has(selectedIdiom.id)}
                    onSaveToggle={onSaveToggle}
                />
            ) : (
                <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                    <p>Select an idiom from the list to view its details.</p>
                </div>
            )}
        </div>
    </div>
  );
}
