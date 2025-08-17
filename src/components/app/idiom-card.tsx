
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
  Pause,
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
  isActive?: boolean;
  shouldPrefetch?: boolean;
}

const MAX_RECORDING_TIME_MS = 7000;

// Shared in-memory cache across all cards to enable instant playback once fetched
const globalAudioCache: Map<string, string> = (globalThis as any).__IDIOM_AUDIO_CACHE__ || new Map();
(globalThis as any).__IDIOM_AUDIO_CACHE__ = globalAudioCache;

export function IdiomCard({ idiom, isSaved, onSaveToggle, isActive = false, shouldPrefetch = false }: IdiomCardProps) {
  const { toast } = useToast();
  const { isRecording, audioBlob, startRecording, stopRecording } = useRecorder();
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [recordingAttempted, setRecordingAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimatingProgress, setIsAnimatingProgress] = useState(false);
  const audioCacheRef = useRef<Map<string, string>>(globalAudioCache);
  const currentTtsAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isExamplePlaying, setIsExamplePlaying] = useState(false);

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
    // Stop any programmatic TTS audio
    if (currentTtsAudioRef.current) {
      try {
        currentTtsAudioRef.current.pause();
        currentTtsAudioRef.current.currentTime = 0;
      } catch (_e) {
        // ignore
      }
      currentTtsAudioRef.current = null;
    }
    setIsExamplePlaying(false);
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

  const playViaServerTts = async (text: string, timeoutMs: number = 1200): Promise<boolean> => {
    try {
      // Don't reset example playing state if we're playing the example
      const isPlayingExample = text === idiom.exampleVietnamese;
      if (!isPlayingExample) {
        stopAllPlayback();
      } else {
        // For example audio, only stop other audio without resetting example state
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        // Stop any previous programmatic audio that's not the example
        if (currentTtsAudioRef.current && (currentTtsAudioRef.current as any).__tts_text !== idiom.exampleVietnamese) {
          try {
            currentTtsAudioRef.current.pause();
            currentTtsAudioRef.current.currentTime = 0;
          } catch (_e) {
            // ignore
          }
          currentTtsAudioRef.current = null;
        }
        // Stop all other audio elements
        try {
          const audioElements = document.querySelectorAll('audio');
          audioElements.forEach(audio => {
            if (!audio.paused && audio !== currentTtsAudioRef.current) {
              audio.pause();
              audio.currentTime = 0;
            }
          });
        } catch (_e) {
          // ignore
        }
      }

      // Use cached audio if available
      const cachedUrl = audioCacheRef.current.get(text);
      if (cachedUrl) {
        // Create a fresh Audio object for each playback to avoid browser caching issues
        const audio = new Audio();
        // Stop any previous programmatic audio
        if (currentTtsAudioRef.current) {
          try {
            currentTtsAudioRef.current.pause();
            currentTtsAudioRef.current.currentTime = 0;
          } catch (_e) {
            // ignore
          }
        }
        currentTtsAudioRef.current = audio;
        (audio as any).__tts_text = text;
        audio.src = cachedUrl;
        // Explicitly load to ensure fresh state
        audio.load();
        await audio.play();
        audio.onended = () => {
          if (currentTtsAudioRef.current === audio) {
            currentTtsAudioRef.current = null;
          }
          if (text === idiom.exampleVietnamese) {
            setIsExamplePlaying(false);
          }
        };
        return true;
      }

      // Fetch with a short timeout to avoid long waits before fallback
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      // Add cache-busting parameter for production environments
      const cacheBuster = Date.now();
      const response = await fetch(`/api/tts?text=${encodeURIComponent(text)}&t=${cacheBuster}`, { signal: controller.signal, cache: 'no-store' });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('Content-Type') || '';
      if (!response.ok || !contentType.includes('audio')) return false;

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      audioCacheRef.current.set(text, url);

      // Create a fresh Audio object for each playback to avoid browser caching issues
      const audio = new Audio();
      // Stop any previous programmatic audio
      if (currentTtsAudioRef.current) {
        try {
          currentTtsAudioRef.current.pause();
          currentTtsAudioRef.current.currentTime = 0;
        } catch (_e) {
          // ignore
        }
      }
      currentTtsAudioRef.current = audio;
      (audio as any).__tts_text = text;
      audio.src = url;
      // Explicitly load to ensure fresh state
      audio.load();
      await audio.play();
      audio.onended = () => {
        if (currentTtsAudioRef.current === audio) {
          currentTtsAudioRef.current = null;
        }
        if (text === idiom.exampleVietnamese) {
          setIsExamplePlaying(false);
        }
      };
      return true;
    } catch (_err) {
      return false;
    }
  };

  const toggleExamplePlayback = async () => {
    const active = currentTtsAudioRef.current;
    const isExampleAudio = active && (active as any).__tts_text === idiom.exampleVietnamese;

    // If current example audio exists
    if (isExampleAudio) {
      if (active!.paused) {
        // Resume
        try {
          await active!.play();
          setIsExamplePlaying(true);
        } catch (_e) {
          // If resume fails, try fresh play
          const played = await playViaServerTts(idiom.exampleVietnamese, 3000);
          setIsExamplePlaying(played);
        }
      } else {
        // Pause without resetting time
        try {
          active!.pause();
        } catch (_e) {
          // ignore
        }
        setIsExamplePlaying(false);
      }
      return;
    }

    // Otherwise start a fresh example playback via server voice
    setIsExamplePlaying(true);
    const played = await playViaServerTts(idiom.exampleVietnamese, 3000);
    if (!played) {
      setIsExamplePlaying(false);
    }
  };

  // Prefetch TTS for active or soon-to-be-active card (phrase, first few chunks, and example)
  useEffect(() => {
    if (!isActive && !shouldPrefetch) return;
    const textsToPrefetch: string[] = [
      idiom.phrase,
      ...idiom.chunks.slice(0, 3).map(c => c.text),
      idiom.exampleVietnamese,
    ];
    const controller = new AbortController();

    const prefetchOne = async (text: string) => {
      if (audioCacheRef.current.has(text)) return;
      try {
        const cacheBuster = Date.now();
        const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}&t=${cacheBuster}`, { signal: controller.signal, cache: 'no-store' });
        if (!res.ok || !(res.headers.get('Content-Type') || '').includes('audio')) return;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        audioCacheRef.current.set(text, url);
      } catch (_e) {
        // ignore prefetch errors
      }
    };

    // Stagger slightly to avoid burst
    textsToPrefetch.forEach((t, i) => {
      setTimeout(() => prefetchOne(t), i * 50);
    });

    return () => controller.abort();
  }, [isActive, shouldPrefetch, idiom.phrase, idiom.chunks]);

  const speak = async (text: string, options?: { serverOnly?: boolean }) => {
    const serverOnly = options?.serverOnly === true;
    // Try high-quality Vietnamese TTS via server first
    const played = await playViaServerTts(text, serverOnly ? 3000 : 1200);
    if (played) return;

    if (serverOnly) {
      // Do not fallback when server voice is required
      return;
    }

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
                        aria-label={isExamplePlaying ? "Pause Vietnamese example" : "Play Vietnamese example"}
                        title={isExamplePlaying ? "Pause Vietnamese example" : "Play Vietnamese example"}
                        onClick={toggleExamplePlayback}
                      >
                        {isExamplePlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
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
