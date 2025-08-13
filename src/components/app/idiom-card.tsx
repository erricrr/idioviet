
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
  SheetDescription,
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
  PlayCircle,
} from "lucide-react";
import { useRecorder } from "@/hooks/use-recorder";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface IdiomCardProps {
  idiom: Idiom;
  isSaved: boolean;
  onSaveToggle: (id: number) => void;
}

export function IdiomCard({ idiom, isSaved, onSaveToggle }: IdiomCardProps) {
  const { toast } = useToast();
  const { isRecording, audioBlob, startRecording, stopRecording } = useRecorder();
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isReRecording, setIsReRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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
      setIsReRecording(false);
      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

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

  const handleRerecord = () => {
    setIsReRecording(true);
    startRecording();
  }

  const handleStopRerecord = () => {
    stopRecording();
  }
  
  const showInitialRecordButton = !isRecording && !userAudioUrl;
  const showLargeStopButton = isRecording && !isReRecording;
  const showPlaybackControls = userAudioUrl && !isRecording;
  const showReRecordingControls = userAudioUrl && isRecording && isReRecording;

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
          className="text-2xl font-bold text-center text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors pt-8"
          onClick={() => speak(idiom.phrase)}
        >
          <div className="flex items-center justify-center gap-2">
            <span>{idiom.phrase}</span>
            <PlayCircle className="w-7 h-7" />
          </div>
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

        <div className="flex justify-center items-center gap-4 my-6 h-20">
          {showInitialRecordButton && (
            <Button
              size="icon"
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-20 h-20 rounded-full"
              onClick={startRecording}
              aria-label="Start recording"
            >
              <Mic className="w-10 h-10" />
            </Button>
          )}

          {showLargeStopButton && (
            <Button
              size="icon"
              variant="destructive"
              onClick={stopRecording}
              aria-label="Stop recording"
              className="w-20 h-20 rounded-full"
            >
              <Square className="w-10 h-10" />
            </Button>
          )}

          {showPlaybackControls && (
             <div className="flex items-center justify-center gap-2">
                <Button onClick={handlePlayUserAudio} variant="secondary" size="lg" className="flex-grow">
                    <Play className="mr-2 h-8 w-8" /> Your Attempt
                </Button>
                <Button 
                    onClick={handleRerecord} 
                    variant="outline" 
                    size="icon"
                    aria-label="Re-record"
                    className="shrink-0 h-12 w-12"
                >
                    <Mic className="h-8 w-8" />
                </Button>
            </div>
          )}

          {showReRecordingControls && (
             <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" size="lg" className="flex-grow" disabled>
                    <Play className="mr-2 h-8 w-8" /> Your Attempt
                </Button>
                <Button 
                    onClick={handleStopRerecord} 
                    variant="destructive" 
                    size="icon"
                    aria-label="Stop re-recording"
                    className="shrink-0 h-12 w-12"
                >
                    <Square className="h-8 w-8" />
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
