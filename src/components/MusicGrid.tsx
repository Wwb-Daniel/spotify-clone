import React from 'react';
import { Song } from '../lib/db';

interface MusicGridProps {
  songs: Song[];
  onSongClick: (song: Song) => void;
  onAddToPlaylist?: (song: Song) => void;
  isLoading?: boolean;
}

export const MusicGrid: React.FC<MusicGridProps> = ({
  songs,
  onSongClick,
  onAddToPlaylist,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (songs.length === 0) {
    return <div className="text-center text-gray-400">No songs found</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer group"
          onClick={() => onSongClick(song)}
        >
          <div className="mb-4 relative overflow-hidden rounded">
            <img
              src={song.image}
              alt={song.title}
              className="w-full aspect-square object-cover group-hover:scale-105 transition"
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSongClick(song);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
            >
              <div className="text-white text-3xl">▶</div>
            </div>
          </div>
          <div className="text-white font-bold truncate">{song.title}</div>
          <div className="text-gray-400 text-sm truncate">{song.artist}</div>
          {onAddToPlaylist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlaylist(song);
              }}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-black text-xs font-bold py-1 rounded"
            >
              Add to Playlist
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
