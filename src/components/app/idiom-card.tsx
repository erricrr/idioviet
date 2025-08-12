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
  LoaderCircle,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useRecorder } from "@/hooks/use-recorder";
import { useEffect, useRef, useState } from "react";
import { generateEncouragementMessage } from "@/ai/flows/generate-encouragement";
import { useToast } from "@/hooks/use-toast";
import { blobToBase64 } from "@/lib/utils";

interface IdiomCardProps {
  idiom: Idiom;
}

export function IdiomCard({ idiom }: IdiomCardProps) {
  const { toast } = useToast();
  const { isRecording, audioBlob, startRecording, stopRecording } = useRecorder();
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [encouragement, setEncouragement] = useState<string | null>(null);
  const [isLoadingEncouragement, setIsLoadingEncouragement] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setUserAudioUrl(url);
      getEncouragement();
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

  const getEncouragement = async () => {
    if (!audioBlob) return;
    setIsLoadingEncouragement(true);
    setEncouragement(null);
    try {
      const recordingDataUri = await blobToBase64(audioBlob);
      const result = await generateEncouragementMessage({ recordingDataUri });
      setEncouragement(result.encouragementMessage);
    } catch (error) {
      console.error("Error generating encouragement:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate encouragement message.",
      });
    } finally {
      setIsLoadingEncouragement(false);
    }
  };

  const handlePlayUserAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden flex flex-col">
      {userAudioUrl && <audio ref={audioRef} src={userAudioUrl} />}
      <CardHeader>
        <CardTitle 
          className="text-2xl font-bold text-center text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors"
          onClick={() => speak(idiom.phrase)}
        >
          {idiom.phrase}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
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

        <div className="flex justify-center items-center gap-4 my-4">
          {!isRecording && (
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={startRecording}
              aria-label="Start recording"
            >
              <Mic className="w-6 h-6 mr-2" />
              Record
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
        </div>
        
        {userAudioUrl && (
          <div className="flex justify-center items-center gap-4 my-4">
            <Button onClick={handlePlayUserAudio} variant="secondary">
              <Play className="mr-2 h-4 w-4" /> Your Attempt
            </Button>
            <Button onClick={startRecording} variant="ghost" size="icon" aria-label="Re-record">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        )}

        <div className="mt-6 min-h-[60px] flex items-center justify-center">
          {isLoadingEncouragement && (
            <div className="flex items-center text-muted-foreground">
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              <p>Generating encouragement...</p>
            </div>
          )}
          {encouragement && !isLoadingEncouragement && (
            <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="flex items-center justify-center text-primary font-medium">
                  <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
                  {encouragement}
                </p>
            </div>
          )}
        </div>

      </CardContent>
      <CardFooter className="p-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-t">
            <AccordionTrigger className="px-6 py-4 text-base font-semibold">
              <Info className="w-5 h-5 mr-3 text-primary" />
              Details & Meaning
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 space-y-4 text-base">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
