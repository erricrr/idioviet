
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Bookmark, Eye } from "lucide-react";

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
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center text-center p-8 border-none">
          <CardContent className="p-0">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Saved Idioms</h2>
            <p className="text-muted-foreground">
              You haven't saved any idioms yet. Tap the save icon on a card to
              add it here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Review All Saved</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] w-full md:max-w-lg p-4 border-none bg-transparent shadow-none">
          <DialogHeader>
            <DialogTitle className="sr-only">Review All Saved Idioms</DialogTitle>
          </DialogHeader>
            <Carousel className="w-full" opts={{ loop: true }}>
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
      
      <Card className="w-full max-w-md mx-auto border-none">
        <CardContent className="p-2">
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="flex flex-col gap-2">
              {idioms.map((idiom) => (
                <div
                  key={idiom.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-card-foreground/5 hover:bg-card-foreground/10 cursor-pointer"
                  onClick={() => setSelectedIdiom(idiom)}
                >
                  <span className="font-medium text-lg">{idiom.phrase}</span>
                  <Eye className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={!!selectedIdiom} onOpenChange={(isOpen) => !isOpen && setSelectedIdiom(null)}>
        <DialogContent className="max-w-[90vw] w-full md:max-w-lg p-4 border-none bg-transparent shadow-none">
            <DialogHeader>
              <DialogTitle className="sr-only">Idiom Details</DialogTitle>
            </DialogHeader>
            {selectedIdiom && (
                 <IdiomCard
                    idiom={selectedIdiom}
                    isSaved={savedIdiomIds.has(selectedIdiom.id)}
                    onSaveToggle={onSaveToggle}
                />
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
