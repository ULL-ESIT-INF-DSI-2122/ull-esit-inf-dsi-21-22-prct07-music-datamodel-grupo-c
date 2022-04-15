import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Song } from './song.class';
import { SongInterface } from './database.interfaces';

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

  public preview(): string {
    let output = 'SONG\t\tARTIST\n\n';
    this.songs.forEach((song) => {
      output += `${song.name}\t`;
      output += `${song.artist}\n`;
    });
    return output;
  }

  public createSong(song: Song) {
    if (!this._songs.find((el: Song) => el.name === song.name)) {
      const newSong: Song = new Song(
        song.name,
        song.artist,
        song.seconds,
        song.genres,
        song.single,
        song.views,
      );
      this._songs.push(newSong);
    }
  }

  public updateSong(inx: number, song: Song) {
    this._songs[inx] = song;
  }

  public saveSong(inx: number, force: boolean = false) {
    const songDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const songToSave: Song = this.song(inx);
    let serialized = songDb.get('songs').value();
    if (force) {
      serialized = serialized.map((song: SongInterface) => {
        if (song.name === songToSave.name) {
          return {
            name: songToSave.name,
            artists: songToSave.artist,
            seconds: songToSave.seconds,
            genres: songToSave.genres,
            single: songToSave.single,
            views: songToSave.views,
            origin: 'User',
          };
        }
        return song;
      });
    }
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
    }
    songDb.set('songs', serialized).write();
  }

  public deleteSong(inx: number): boolean {
    const songDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const songToDelete: Song = this.song(inx);
    let serialized = songDb.get('songs').value();
    if (serialized.find((el: SongInterface) => el.name === songToDelete.name)
      && serialized.find((el: SongInterface) => el.name === songToDelete.name).origin === 'User') {
      serialized = serialized.filter((el: SongInterface) => el.name !== songToDelete.name);
      songDb.set('songs', serialized).write();
      this._songs = this._songs.filter((song, i) => i !== inx);
      return true;
    }
    return false;
  }

  private deserializeSongs(songs: SongInterface[]) {
    songs.forEach((song) => {
      const systemSong = new Song(
        song.name,
        song.artist,
        song.seconds,
        song.genres,
        song.single,
        song.views,
      );
      this._songs.push(systemSong);
    });
  }
}
