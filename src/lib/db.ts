import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';

export interface Song {
  id?: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  image: string;
  userId: string;
}

export interface Playlist {
  id?: string;
  name: string;
  description: string;
  userId: string;
  songs: string[];
  createdAt: Timestamp;
}

export const addSong = async (song: Omit<Song, 'id'>) =>
  addDoc(collection(db, 'songs'), song);

export const getUserSongs = async (userId: string) => {
  const q = query(collection(db, 'songs'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createPlaylist = async (playlist: Omit<Playlist, 'id'>) =>
  addDoc(collection(db, 'playlists'), playlist);

export const getUserPlaylists = async (userId: string) => {
  const q = query(collection(db, 'playlists'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addSongToPlaylist = async (playlistId: string, songId: string) => {
  const playlistRef = doc(db, 'playlists', playlistId);
  return updateDoc(playlistRef, { songs: arrayUnion(songId) });
};

export const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
  const playlistRef = doc(db, 'playlists', playlistId);
  return updateDoc(playlistRef, { songs: arrayRemove(songId) });
};

export const deletePlaylist = async (playlistId: string) =>
  deleteDoc(doc(db, 'playlists', playlistId));
