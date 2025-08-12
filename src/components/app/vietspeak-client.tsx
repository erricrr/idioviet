
"use client"

import { idioms } from "@/data/idioms";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IdiomCard } from "./idiom-card";
import { Header } from "./header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const SAVED_IDIOMS_KEY = 'vietSpeakSavedIdioms';

export function VietSpeakClient() {
    const [savedIdiomIds, setSavedIdiomIds] = useState<Set<number>>(new Set());

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

    const savedIdioms = idioms.filter(idiom => savedIdiomIds.has(idiom.id));

    return (
        <div className="flex flex-col h-full">
            <Header />
            <Tabs defaultValue="all" className="w-full flex flex-col flex-grow">
                <div className="px-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="saved">Saved</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="all" className="flex-grow flex items-center justify-center p-4 m-0">
                    <Carousel className="w-full max-w-lg" opts={{ loop: true }}>
                        <CarouselContent>
                            {idioms.map((idiom) => (
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
                </TabsContent>
                <TabsContent value="saved" className="flex-grow p-4 m-0 overflow-hidden">
                    {savedIdioms.length > 0 ? (
                         <ScrollArea className="h-full w-full">
                            <div className="flex flex-col gap-4 max-w-md mx-auto">
                                {savedIdioms.map((idiom) => (
                                    <IdiomCard
                                        key={idiom.id}
                                        idiom={idiom}
                                        isSaved={savedIdiomIds.has(idiom.id)}
                                        onSaveToggle={toggleSaveIdiom}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <Card className="w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center text-center p-8 border-none">
                                <CardContent className="p-0">
                                    <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h2 className="text-xl font-semibold mb-2">No Saved Idioms</h2>
                                    <p className="text-muted-foreground">You haven't saved any idioms yet. Tap the save icon on a card to add it here.</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
