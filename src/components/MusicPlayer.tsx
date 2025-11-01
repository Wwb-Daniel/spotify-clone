import React, { useState, useRef, useEffect } from 'react';
import { Song } from '../lib/db';

interface MusicPlayerProps {
  song: Song | null;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  onNext,
  onPrevious,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <div className="w-16 h-16">
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex-1">
          <div className="text-white font-bold">{song.title}</div>
          <div className="text-gray-400 text-sm">{song.artist}</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="text-gray-400 text-xs">{formatTime(currentTime)}</div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = parseFloat(e.target.value);
                }
              }}
              className="flex-1"
            />
            <div className="text-gray-400 text-xs">{formatTime(duration)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onPrevious && (
            <button
              onClick={onPrevious}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
            >
              Prev
            </button>
          )}
          <button
            onClick={togglePlay}
            className="bg-green-500 hover:bg-green-600 text-black p-2 rounded-full"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          {onNext && (
            <button
              onClick={onNext}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
            >
              Next
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};
