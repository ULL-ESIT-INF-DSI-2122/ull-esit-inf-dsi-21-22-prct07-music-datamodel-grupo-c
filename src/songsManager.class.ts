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
  origin: string,
}

export default class SongsManager {
  private _songs: Song[];

  constructor() {
    this._songs = [];
    const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serialized = songsDb.get('songs').value();
    this.deserializeSongs(serialized);
  }

  get songs(): Song[] { return this._songs; }

  public createSong(song: Song) {
    if (!this._songs.find((el: Song) => el.name === song.name)) {
      const newSong: Song = new Song(song.name);
      this._songs.push(newSong);
    }
  }

  private deserializeSongs(songs: SongInterface[]) {
    songs.forEach((song) => {
      const systemSong = new Song(song.name);
      this._songs.push(systemSong);
    });
  }
}
