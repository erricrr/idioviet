"use client";

import type { Idiom } from "@/data/idioms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mic,
  Square,
  Play,
  Info,
} from "lucide-react";
import { useRecorder } from "@/hooks/use-recorder";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IdiomCardProps {
  idiom: Idiom;
}

export function IdiomCard({ idiom }: IdiomCardProps) {
  const { toast } = useToast();
  const { isRecording, audioBlob, startRecording, stopRecording } = useRecorder();
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setUserAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        variant: "destructive",
        title: "TTS Not Supported",
        description: "Your browser does not support text-to-speech.",
      });
    }
  };

  const handlePlayUserAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleRerecord = () => {
    setUserAudioUrl(null);
    startRecording();
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg flex flex-col h-full">
      {userAudioUrl && <audio ref={audioRef} src={userAudioUrl} />}
      <CardHeader>
        <CardTitle 
          className="text-2xl font-bold text-center text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors"
          onClick={() => speak(idiom.phrase)}
        >
          {idiom.phrase}
        </CardTitle>
      </CardHeader>
      
      <div className="flex-grow flex flex-col min-h-0">
        <CardContent className="p-6 pt-0">
          <div className="text-center mb-6">
            <p className="font-semibold text-lg">Practice in chunks:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {idiom.chunks.map((chunk, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-lg px-4 py-2 cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => speak(chunk.text)}
                >
                  {chunk.text}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 my-6">
            {!isRecording && (
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={userAudioUrl ? handleRerecord : startRecording}
                aria-label={userAudioUrl ? "Re-record" : "Start recording"}
              >
                <Mic className="w-6 h-6 mr-2" />
                {userAudioUrl ? 'Re-record' : 'Record'}
              </Button>
            )}

            {isRecording && (
              <Button
                size="lg"
                variant="destructive"
                onClick={stopRecording}
                className="animate-pulse"
                aria-label="Stop recording"
              >
                <Square className="w-6 h-6 mr-2" />
                Stop
              </Button>
            )}

            {userAudioUrl && !isRecording && (
              <Button onClick={handlePlayUserAudio} variant="secondary" size="lg">
                <Play className="mr-2 h-5 w-5" /> Your Attempt
              </Button>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-0 flex-grow min-h-0">
            <Accordion type="single" collapsible className="w-full border-t">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="px-6 py-4 text-base font-semibold">
                  <Info className="w-5 h-5 mr-3 text-primary" />
                  Details & Meaning
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-base">
                   <ScrollArea className="h-full max-h-[30vh] pr-4">
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-muted-foreground">Literal Translation</p>
                          <p>"{idiom.literalTranslation}"</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">Actual Meaning</p>
                          <p>{idiom.actualMeaning}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">Example (Vietnamese)</p>
                          <p>{idiom.exampleVietnamese}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">Example (English)</p>
                          <p>{idiom.exampleEnglish}</p>
                        </div>
                      </div>
                   </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </CardFooter>
      </div>
    </Card>
  );
}
