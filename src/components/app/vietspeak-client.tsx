"use client"

import { idioms } from "@/data/idioms";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IdiomCard } from "./idiom-card";
import { Header } from "./header";

export function VietSpeakClient() {
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-grow overflow-y-auto p-4">
                <div className="flex items-center justify-center min-h-full">
                    <Carousel className="w-full max-w-lg" opts={{ loop: true }}>
                        <CarouselContent className="-ml-2">
                            {idioms.map((idiom) => (
                                <CarouselItem key={idiom.id} className="pl-2">
                                    <div className="p-1">
                                        <IdiomCard idiom={idiom} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-[-8px]" />
                        <CarouselNext className="mr-[-8px]" />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
