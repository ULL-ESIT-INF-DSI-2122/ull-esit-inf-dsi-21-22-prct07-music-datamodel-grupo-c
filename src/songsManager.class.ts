import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Song } from './song.class';

interface SongInterface {
  name: string,
  artist: string,
  seconds: number,
  genres: string[],
  single: boolean,
  views: number,
}
