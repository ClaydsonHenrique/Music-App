import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';

export default function MusicPlayer({ music }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const volumeBarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentTrack = music; 
  
  const handleVolumeChange = (e) => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    let newVolume = clickX / rect.width;
    if (newVolume < 0) newVolume = 0;
    if (newVolume > 1) newVolume = 1;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleVolumeChange(e);
  };
  const handleMouseMove = (e) => {
    if (isDragging) handleVolumeChange(e);
  };
  
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const updateTime = () => setCurrentTime(audioRef.current.currentTime);
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      return () => {
        audioRef.current.removeEventListener('timeupdate', updateTime);
      };
    }
  },);
  
  useEffect(() => {
    if (music && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); 
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [music]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
      <audio ref={audioRef} src={currentTrack.previewUrl} />
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 w-1/4">
          <img
            src={currentTrack.artworkUrl100}
            alt={currentTrack.trackName}
            className="w-14 h-14 rounded"
          />
          <div className="min-w-0">
            <h4 className="text-white font-medium truncate">{currentTrack.trackName}</h4>
            <p className="text-gray-400 text-sm truncate">{currentTrack.artistName}</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 w-2/4 max-w-md">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className="h-10 w-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-black" />
              ) : (
                <Play className="h-5 w-5 text-black ml-0.5" />
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
          <Volume2 className="h-5 w-5 text-gray-400" />
          <div
            ref={volumeBarRef}
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
