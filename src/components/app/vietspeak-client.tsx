
"use client"

import { idioms } from "@/data/idioms";
import { Header } from "./header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { SavedIdiomsList } from "./saved-idioms-list";

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
    
    const allIdioms = idioms;
    const savedIdioms = allIdioms.filter(idiom => savedIdiomIds.has(idiom.id));

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

                <TabsContent value="all" className="flex-grow m-0 flex items-center justify-center p-4">
                    <SavedIdiomsList
                        idioms={allIdioms}
                        savedIdiomIds={savedIdiomIds}
                        onSaveToggle={toggleSaveIdiom}
                        view="carousel"
                    />
                </TabsContent>
                <TabsContent value="saved" className="flex-grow m-0 p-4 overflow-hidden">
                    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
                        <SavedIdiomsList
                            idioms={savedIdioms}
                            savedIdiomIds={savedIdiomIds}
                            onSaveToggle={toggleSaveIdiom}
                            view="list"
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
