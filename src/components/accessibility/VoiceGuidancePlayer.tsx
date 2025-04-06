
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface VoiceGuidancePlayerProps {
  title: string;
  audioSrc: string;
  transcriptText?: string;
  onComplete?: () => void;
  className?: string;
}

const VoiceGuidancePlayer: React.FC<VoiceGuidancePlayerProps> = ({
  title,
  audioSrc,
  transcriptText,
  onComplete,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onComplete) onComplete();
    });
    
    audio.volume = volume;
    
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audioSrc, onComplete]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
          toast({
            title: "Audio Error",
            description: "There was an error playing the audio. Please try again.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeChange = (newValue: number[]) => {
    const newTime = newValue[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration, currentTime + 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium truncate flex-1">{title}</h3>
            {transcriptText && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-xs"
              >
                {showTranscript ? "Hide Transcript" : "Show Transcript"}
              </Button>
            )}
          </div>
          
          {showTranscript && transcriptText && (
            <div className="rounded-md bg-muted p-3 my-2 text-sm max-h-24 overflow-y-auto">
              {transcriptText}
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.01}
              onValueChange={handleTimeChange}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={skipBackward}
                disabled={!duration}
                className="h-8 w-8"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button 
                size="icon" 
                variant={isPlaying ? "outline" : "default"}
                onClick={togglePlay}
                disabled={!duration}
                className="h-10 w-10"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={skipForward}
                disabled={!duration}
                className="h-8 w-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={toggleMute}
                className="h-8 w-8"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            {currentLanguage.code === 'en' ? 'Voice guidance available' : 
             currentLanguage.code === 'hi' ? 'आवाज निर्देशन उपलब्ध है' : 
             currentLanguage.code === 'te' ? 'వాయిస్ గైడెన్స్ అందుబాటులో ఉంది' :
             'વૉઇસ માર્ગદર્શન ઉપલબ્ધ છે'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceGuidancePlayer;
