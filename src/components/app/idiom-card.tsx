
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Mic,
  Square,
  Play,
  Info,
  Bookmark,
} from "lucide-react";
import { useRecorder } from "@/hooks/use-recorder";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IdiomCardProps {
  idiom: Idiom;
  isSaved: boolean;
  onSaveToggle: (id: number) => void;
}

const MAX_RECORDING_TIME_MS = 7000;

export function IdiomCard({ idiom, isSaved, onSaveToggle }: IdiomCardProps) {
  const { toast } = useToast();
  const { isRecording, audioBlob, startRecording, stopRecording } = useRecorder();
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimatingProgress, setIsAnimatingProgress] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setUserAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);
  
  const cleanupTimers = () => {
    if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
        recordingTimerRef.current = null;
    }
  };

  useEffect(() => {
    // When isRecording becomes true, trigger the animation
    if (isRecording) {
        // Use a timeout to allow the DOM to update before adding the class
        const animationTimeout = setTimeout(() => {
            setIsAnimatingProgress(true);
        }, 10);
        return () => clearTimeout(animationTimeout);
    }
  }, [isRecording]);

  useEffect(() => {
    // Component unmount cleanup
    return () => cleanupTimers();
  }, []);

  const handleStartRecording = () => {
    setUserAudioUrl(null);
    if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
    }
    
    startRecording();

    recordingTimerRef.current = setTimeout(() => {
      handleStopRecording();
    }, MAX_RECORDING_TIME_MS);
  };

  const handleStopRecording = () => {
    if (!isRecording) return;
    stopRecording();
    cleanupTimers();
    setIsAnimatingProgress(false);
  };


  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      
      const vietnameseVoice = voices.find(
        (voice) => voice.lang === 'vi-VN' && (voice.name.includes('Linh') || voice.name.includes('Northern'))
      ) || voices.find(voice => voice.lang === 'vi-VN');

      if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
      }
      
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

  const hasRecording = userAudioUrl !== null;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg flex flex-col border-none">
      {userAudioUrl && <audio ref={audioRef} src={userAudioUrl} />}
      <CardHeader className="relative">
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onSaveToggle(idiom.id)}
            aria-label={isSaved ? "Unsave idiom" : "Save idiom"}
        >
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-primary text-primary' : 'text-primary'}`} />
        </Button>
        <CardTitle 
          className="text-2xl font-bold text-center text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors pt-8 flex items-center justify-center gap-2"
          onClick={() => speak(idiom.phrase)}
        >
          {idiom.phrase}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 flex flex-col">
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
        
        <div className="flex flex-col justify-center items-center gap-4 my-6 min-h-[140px]">
            {!isRecording && !hasRecording && (
                <div className="w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Button onClick={handleStartRecording} variant="destructive" size="lg" className="h-14 w-full">
                        <Mic className="h-6 w-6 mr-2" /> Record
                    </Button>
                </div>
            )}

            {isRecording && (
                <div className="w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Button onClick={handleStopRecording} variant="destructive" size="lg" className="h-14 w-full relative overflow-hidden">
                        <div className={cn("recording-progress", isAnimatingProgress && "w-full")} />
                        <div className="relative z-10 flex items-center">
                            <Square className="w-6 h-6 mr-2" /> Stop
                        </div>
                    </Button>
                </div>
            )}
            
            {!isRecording && hasRecording && (
                <div className="flex flex-col items-stretch justify-center gap-2 w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Button onClick={handlePlayUserAudio} variant="default" size="lg" className="flex-grow h-14 w-full">
                        <Play className="mr-2 h-6 w-6" /> Play Your Attempt
                    </Button>
                    <Button onClick={handleStartRecording} variant="destructive" size="lg" className="flex-grow h-14 w-full">
                        <Mic className="h-6 w-6 mr-2" /> Record Again
                    </Button>
                </div>
            )}
        </div>
      </CardContent>

      <CardFooter className="p-0 mt-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-full rounded-t-none hover:bg-secondary">
              <Info className="w-5 h-5 mr-2" />
              Details & Meaning
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-lg flex flex-col h-[90vh]">
             <div className="p-4 border-b border-border -mx-6 -mt-6 mb-4 sticky top-0 bg-background z-10">
                <SheetClose asChild>
                    <Button variant="secondary" className="w-full">
                        Close
                    </Button>
                </SheetClose>
            </div>
            <ScrollArea className="flex-grow w-full touch-pan-y -mx-6 px-6">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-2xl text-primary">{idiom.phrase}</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 text-left pb-8">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-muted-foreground">Literal Translation</h3>
                    <p className="text-lg italic">"{idiom.literalTranslation}"</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-muted-foreground">Actual Meaning</h3>
                    <p className="text-lg">{idiom.actualMeaning}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-muted-foreground">Example (Vietnamese)</h3>
                    <p className="text-lg">{idiom.exampleVietnamese}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-muted-foreground">Example (English)</h3>
                    <p className="text-lg">{idiom.exampleEnglish}</p>
                  </div>
                </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}

    