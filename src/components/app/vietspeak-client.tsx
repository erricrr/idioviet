"use client"

import { idioms } from "@/data/idioms";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IdiomCard } from "./idiom-card";
import { Header } from "./header";

export function VietSpeakClient() {
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-grow flex flex-col p-4 overflow-hidden">
                <div className="flex-grow flex items-center justify-center min-h-0">
                    <Carousel className="w-full max-w-lg h-full" opts={{ loop: true }}>
                        <CarouselContent className="-ml-2 h-full">
                            {idioms.map((idiom) => (
                                <CarouselItem key={idiom.id} className="pl-2 h-full">
                                    <div className="p-1 h-full">
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
