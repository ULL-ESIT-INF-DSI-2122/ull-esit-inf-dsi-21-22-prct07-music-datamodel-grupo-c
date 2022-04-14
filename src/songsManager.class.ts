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

  public song(inx: number = 0): Song { return this.songs[inx]; }

  public createSong(song: Song) {
    if (!this._songs.find((el: Song) => el.name === song.name)) {
      const newSong: Song = new Song(song.name);
      this._songs.push(newSong);
    }
  }

  public updateSong(inx: number, song: Song) {
    this._songs[inx] = song;
  }

  public saveSong(inx: number) {
    const songDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const songToSave: Song = this.song(inx);
    const serialized = songDb.get('songs').value();
    if (!serialized.find((el: SongInterface) => el.name === songToSave.name)) {
      serialized.push({
        name: songToSave.name,
        artists: songToSave.artist,
        seconds: songToSave.seconds,
        genres: songToSave.genres,
        single: songToSave.single,
        views: songToSave.views,
        origin: 'User',
      });
      songDb.set('songs', serialized).write();
    }
  }

  private deserializeSongs(songs: SongInterface[]) {
    songs.forEach((song) => {
      const systemSong = new Song(song.name);
      this._songs.push(systemSong);
    });
  }
}
