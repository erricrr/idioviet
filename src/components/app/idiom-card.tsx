
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
  Volume2,
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
  const [recordingAttempted, setRecordingAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimatingProgress, setIsAnimatingProgress] = useState(false);
  const audioCacheRef = useRef<Map<string, string>>(new Map());

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
    } else {
      setUserAudioUrl(null);
    }
  }, [audioBlob]);


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
    return () => {
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }
    };
  }, []);

  const handleStartRecording = () => {
    setRecordingAttempted(false);
    setUserAudioUrl(null);
    setIsAnimatingProgress(false);
    startRecording();
    recordingTimerRef.current = setTimeout(handleStopRecording, MAX_RECORDING_TIME_MS);
  };

  const handleStopRecording = () => {
    if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
        recordingTimerRef.current = null;
    }
    stopRecording();
    setIsAnimatingProgress(false);
    setRecordingAttempted(true);
  };

  const stopAllPlayback = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // Stop all audio elements on the page (including cached ones)
    try {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    } catch (_e) {
      // ignore
    }
  };

  const playViaServerTts = async (text: string): Promise<boolean> => {
    try {
      stopAllPlayback();

      // Use cached audio if available
      const cachedUrl = audioCacheRef.current.get(text);
      if (cachedUrl) {
        // Create a fresh Audio object for each playback to avoid browser caching issues
        const audio = new Audio();
        audio.src = cachedUrl;
        // Explicitly load to ensure fresh state
        audio.load();
        await audio.play();
        return true;
      }

      // Fetch with a short timeout to avoid long waits before fallback
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      // Add cache-busting parameter for production environments
      const cacheBuster = Date.now();
      const response = await fetch(`/api/tts?text=${encodeURIComponent(text)}&t=${cacheBuster}`, { signal: controller.signal });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('Content-Type') || '';
      if (!response.ok || !contentType.includes('audio')) return false;

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      audioCacheRef.current.set(text, url);

      // Create a fresh Audio object for each playback to avoid browser caching issues
      const audio = new Audio();
      audio.src = url;
      // Explicitly load to ensure fresh state
      audio.load();
      await audio.play();
      return true;
    } catch (_err) {
      return false;
    }
  };

  const speak = async (text: string) => {
    // Try high-quality Vietnamese TTS via server first
    const played = await playViaServerTts(text);
    if (played) return;

    // Fallback: Browser Web Speech API
    if (typeof window !== "undefined" && window.speechSynthesis) {
      stopAllPlayback();
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
            <Bookmark className={`w-6 h-6 text-primary`} fill={isSaved ? "currentColor" : "none"} />
        </Button>
        <CardTitle
          className="text-3xl font-bold text-center text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors pt-8 flex items-center justify-center gap-2 underline decoration-dashed decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary focus-visible:underline focus-visible:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
          onClick={() => speak(idiom.phrase)}
          role="button"
          tabIndex={0}
          title="Tap to play pronunciation"
        >
          {idiom.phrase}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex flex-col">
        <div className="text-center mb-4">
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

        <div className="flex flex-col justify-end items-center gap-2 my-3 h-[110px]">
            {!isRecording && !recordingAttempted && (
                <div className="w-full px-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Button onClick={handleStartRecording} variant="destructive" size="lg" className="h-14 w-full">
                        <Mic className="h-6 w-6 mr-2" /> Record
                    </Button>
                </div>
            )}

            {isRecording && (
                <div className="w-full px-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Button onClick={handleStopRecording} variant="destructive" size="lg" className="h-14 w-full relative overflow-hidden">
                        <div className={cn("recording-progress")} style={{ width: isAnimatingProgress ? "100%" : 0, transitionDuration: `${MAX_RECORDING_TIME_MS}ms` }} />
                        <div className="relative z-10 flex items-center">
                            <Square className="w-6 h-6 mr-2" /> Stop
                        </div>
                    </Button>
                </div>
            )}

            {!isRecording && recordingAttempted && (
                <div className="flex flex-col items-stretch justify-center gap-2 w-full px-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <Button onClick={handlePlayUserAudio} variant="default" size="lg" className="flex-grow h-14 w-full" disabled={!hasRecording}>
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
                  <SheetTitle
                    className="text-2xl text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors flex items-center gap-2 underline decoration-dashed decoration-primary/50 decoration-2 underline-offset-4"
                    onClick={() => speak(idiom.phrase)}
                    role="button"
                    tabIndex={0}
                    title="Tap to play pronunciation"
                  >
                    {idiom.phrase}
                  </SheetTitle>
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-muted-foreground">Example (Vietnamese)</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Play Vietnamese example"
                        title="Play Vietnamese example"
                        onClick={() => speak(idiom.exampleVietnamese)}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
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
