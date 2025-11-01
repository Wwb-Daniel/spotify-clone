import React, { useState } from 'react';
import { Playlist } from '../lib/db';
import { createPlaylist, deletePlaylist } from '../lib/db';
import { Timestamp } from 'firebase/firestore';

interface PlaylistManagerProps {
  userId: string;
  playlists: Playlist[];
  onPlaylistCreated?: () => void;
}

export const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  userId,
  playlists,
  onPlaylistCreated,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPlaylist({
        name,
        description,
        userId,
        songs: [],
        createdAt: Timestamp.now(),
      });
      setName('');
      setDescription('');
      setShowForm(false);
      onPlaylistCreated?.();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this playlist?')) {
      await deletePlaylist(id);
      onPlaylistCreated?.();
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded mb-6"
      >
        {showForm ? 'Cancel' : '+ New Playlist'}
      </button>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-gray-900 p-6 rounded mb-6">
          <input
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 mb-4 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 mb-4 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded"
          >
            Create
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {playlists.map((pl) => (
          <div key={pl.id} className="bg-gray-900 p-4 rounded flex justify-between items-center">
            <div>
              <div className="text-white font-bold">{pl.name}</div>
              <div className="text-gray-400 text-sm">{pl.songs?.length || 0} songs</div>
            </div>
            <button
              onClick={() => handleDelete(pl.id!)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
