"use client"

import { idioms } from "@/data/idioms";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IdiomCard } from "./idiom-card";
import { Header } from "./header";

export function VietSpeakClient() {
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-grow flex items-center justify-center p-4">
                <Carousel className="w-full max-w-lg" opts={{ loop: true }}>
                    <CarouselContent>
                        {idioms.map((idiom) => (
                            <CarouselItem key={idiom.id}>
                                <div className="p-1 h-full">
                                    <IdiomCard idiom={idiom} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-[-8px] md:ml-[-24px]" />
                    <CarouselNext className="mr-[-8px] md:mr-[-24px]" />
                </Carousel>
            </div>
        </div>
    )
}