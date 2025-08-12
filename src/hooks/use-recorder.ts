"use client";

import { useState, useRef } from 'react';
import { useToast } from './use-toast';

export const useRecorder = () => {
    const { toast } = useToast();
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        if (isRecording) return;
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Prefer mp4 but fallback to default
            const options = { mimeType: 'audio/mp4' };
            const isSupported = MediaRecorder.isTypeSupported(options.mimeType);
            
            mediaRecorderRef.current = new MediaRecorder(stream, isSupported ? options : undefined);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = event => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: isSupported ? 'audio/mp4' : 'audio/webm' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setAudioBlob(null);
        } catch (error) {
            console.error("Error starting recording:", error);
            toast({
                variant: "destructive",
                title: "Recording Error",
                description: "Could not start recording. Please ensure microphone permissions are granted.",
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return { isRecording, audioBlob, startRecording, stopRecording };
};
