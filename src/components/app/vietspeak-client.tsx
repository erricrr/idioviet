
"use client"

import { idioms } from "@/data/idioms";
import { Header } from "./header";
import { useEffect, useRef, useState } from "react";
import { SavedIdiomsList } from "./saved-idioms-list";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IdiomCard } from "./idiom-card";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SAVED_IDIOMS_KEY = 'vietSpeakSavedIdioms';

export function VietSpeakClient() {
    const [savedIdiomIds, setSavedIdiomIds] = useState<Set<number>>(new Set());
    const [isSavedListOpen, setIsSavedListOpen] = useState(false);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const [isReviewingSaved, setIsReviewingSaved] = useState(false);
    const [progress, setProgress] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem(SAVED_IDIOMS_KEY);
        if (saved) {
            setSavedIdiomIds(new Set(JSON.parse(saved)));
        }
    }, []);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }

        const handleSelect = () => {
            const current = carouselApi.selectedScrollSnap();
            const count = carouselApi.scrollSnapList().length;
            const newProgress = ((current + 1) / count) * 100;
            setProgress(newProgress);
        };
    
        handleSelect(); // Set initial progress
        carouselApi.on("select", handleSelect);
    
        return () => {
          carouselApi.off("select", handleSelect);
        };
    }, [carouselApi, isReviewingSaved]);

    const toggleSaveIdiom = (id: number) => {
        const newSavedIds = new Set(savedIdiomIds);
        if (newSavedIds.has(id)) {
            newSavedIds.delete(id);
        } else {
            newSavedIds.add(id);
        }
        setSavedIdiomIds(newSavedIds);
        localStorage.setItem(SAVED_IDIOMS_KEY, JSON.stringify(Array.from(newSavedIds)));
    };

    const handleSelectIdiomFromList = (id: number) => {
      if (isReviewingSaved) {
        setIsReviewingSaved(false);
        // We need to wait for the main carousel to re-render with all idioms
        // before we can accurately scroll to the selected one.
        setTimeout(() => {
            const index = allIdioms.findIndex(idiom => idiom.id === id);
            if (index !== -1 && carouselApi) {
                carouselApi.scrollTo(index, true);
            }
        }, 0)
      } else {
        const index = allIdioms.findIndex(idiom => idiom.id === id);
        if (index !== -1 && carouselApi) {
          carouselApi.scrollTo(index, true);
        }
      }
    };

    const handleReviewAll = () => {
        setIsSavedListOpen(false);
        setIsReviewingSaved(true);
    };

    const handleExitReview = () => {
        setIsReviewingSaved(false);
    }
    
    const allIdioms = idioms;
    const savedIdioms = allIdioms.filter(idiom => savedIdiomIds.has(idiom.id));
    const idiomsToShow = isReviewingSaved ? savedIdioms : allIdioms;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <Header onSavedListClick={() => setIsSavedListOpen(true)} savedCount={savedIdioms.length} />
            {idiomsToShow.length > 1 && (
                <div className="px-4 pb-2">
                    <Progress value={progress} className="w-full h-2" />
                </div>
            )}
            
            <div className="flex-grow flex items-center justify-center p-2 relative">
                {isReviewingSaved && (
                    <Button 
                        onClick={handleExitReview}
                        variant="secondary"
                        className="absolute top-0 right-4 z-10"
                    >
                        <X className="w-5 h-5 mr-2" />
                        Exit Review
                    </Button>
                )}
                 <Carousel 
                    ref={carouselRef}
                    setApi={setCarouselApi}
                    className="w-full max-w-lg" 
                    opts={{ loop: !isReviewingSaved }}
                    key={isReviewingSaved ? 'saved' : 'all'}
                >
                    <CarouselContent>
                    {idiomsToShow.length > 0 ? idiomsToShow.map((idiom) => (
                        <CarouselItem key={idiom.id}>
                        <div className="p-1">
                            <IdiomCard
                                idiom={idiom}
                                isSaved={savedIdiomIds.has(idiom.id)}
                                onSaveToggle={toggleSaveIdiom}
                            />
                        </div>
                        </CarouselItem>
                    )) : (
                        <CarouselItem>
                            <div className="p-1 text-center text-muted-foreground h-96 flex items-center justify-center">
                                No saved idioms to review.
                            </div>
                        </CarouselItem>
                    )}
                    </CarouselContent>
                    <CarouselPrevious className="ml-2" />
                    <CarouselNext className="mr-2" />
                </Carousel>
            </div>

            <SavedIdiomsList 
                idioms={savedIdioms}
                onSelectIdiom={handleSelectIdiomFromList}
                onReviewAll={handleReviewAll}
                isSheetOpen={isSavedListOpen}
                onSheetOpenChange={setIsSavedListOpen}
                savedIdiomIds={savedIdiomIds}
                onSaveToggle={toggleSaveIdiom}
            />
        </div>
    )
}
