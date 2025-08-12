
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

const SAVED_IDIOMS_KEY = 'vietSpeakSavedIdioms';

export function VietSpeakClient() {
    const [savedIdiomIds, setSavedIdiomIds] = useState<Set<number>>(new Set());
    const [isSavedListOpen, setIsSavedListOpen] = useState(false);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem(SAVED_IDIOMS_KEY);
        if (saved) {
            setSavedIdiomIds(new Set(JSON.parse(saved)));
        }
    }, []);

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
      const index = allIdioms.findIndex(idiom => idiom.id === id);
      if (index !== -1 && carouselApi) {
        carouselApi.scrollTo(index);
      }
    };
    
    const allIdioms = idioms;
    const savedIdioms = allIdioms.filter(idiom => savedIdiomIds.has(idiom.id));

    return (
        <div className="flex flex-col h-full">
            <Header onSavedListClick={() => setIsSavedListOpen(true)} savedCount={savedIdioms.length} />
            
            <div className="flex-grow flex items-center justify-center p-4">
                 <Carousel 
                    ref={carouselRef}
                    setApi={setCarouselApi}
                    className="w-full max-w-lg" 
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                    {allIdioms.map((idiom) => (
                        <CarouselItem key={idiom.id}>
                        <div className="p-1">
                            <IdiomCard
                            idiom={idiom}
                            isSaved={savedIdiomIds.has(idiom.id)}
                            onSaveToggle={toggleSaveIdiom}
                            />
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-[-8px] md:ml-[-24px]" />
                    <CarouselNext className="mr-[-8px] md:mr-[-24px]" />
                </Carousel>
            </div>

            <SavedIdiomsList 
                idioms={savedIdioms}
                onSelectIdiom={handleSelectIdiomFromList}
                isSheetOpen={isSavedListOpen}
                onSheetOpenChange={setIsSavedListOpen}
                savedIdiomIds={savedIdiomIds}
                onSaveToggle={toggleSaveIdiom}
            />
        </div>
    )
}
