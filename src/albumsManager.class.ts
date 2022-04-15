import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Album } from './album.class';
import { AlbumInterface, SongInterface } from './database.interfaces';
import { Song } from './song.class';

/**
* # AlbumManager Class.
* Album class that manage all the Albums sets and gets from db
 *
 * ## Properties
 * - _albums | Album collection.
 *
 * ## Methods
 * -  get albums() | Returns the album collection.
 * -  preview() | Returns console print of ALBUM collection.
 * -  album(inx) | Returns the album indicated by a index.
 * -  createAlbum(index, album) | Creates a new album and push it to album collection.
 * -  updateAlbum(index, force) | saves an album into database.
 * -  get deleteAlbum(index) | delete an album indicated by index from database.
 * -  getSongs() | Get the songs of the album.
 * -  deserializeAlbum(albums) |
 */
export default class AlbumsManager {
  private _albums: Album[];

  constructor() {
    this._albums = [];
    const albumDb: lowdb.LowdbSync<AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const serialized = albumDb.get('albums').value();
    this.deserializeAlbums(serialized);
  }

  get albums(): Album[] { return this._albums; }

  public preview(): string {
    let output = 'ALBUMS\n\n';
    this.albums.forEach((album) => {
      output += `${album.name}\n`;
    });
    return output;
  }

  public album(index: number = 0): Album { return this.albums[index]; }

  public createAlbum(album: Album) {
    if (!this._albums.find((el: Album) => el.name === album.name)) {
      const newAlbum: Album = new Album(
        album.name,
        album.artist,
        album.year,
        album.genres,
        album.songs,
      );
      this._albums.push(newAlbum);
    }
  }

  public updateAlbum(index: number, album: Album) { this._albums[index] = album; }

  public saveAlbum(index: number, force: boolean = false) {
    const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const albumToSave: Album = this.album(index);
    let serialized = albumDb.get('albums').value();
    if (force) {
      serialized = serialized.map((album: AlbumInterface) => {
        if (album.name === albumToSave.name) {
          return {
            name: albumToSave.name,
            artist: albumToSave.artist,
            year: albumToSave.year,
            genres: albumToSave.genres,
            songs: albumToSave.songs.map((el) => el.name),
            origin: 'User',
          };
        }
        return album;
      });
    }
    if (!serialized.find((el: AlbumInterface) => el.name === albumToSave.name)) {
      serialized.push({
        name: albumToSave.name,
        artists: albumToSave.artist,
        year: albumToSave.year,
        genres: albumToSave.genres,
        songs: albumToSave.songs.map((el) => el.name),
        origin: 'User',
      });
    }
    albumDb.set('albums', serialized).write();
  }

  public deleteAlbum(index: number): boolean {
    const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const albumToDelete: Album = this.album(index);
    let serialized = albumDb.get('albums').value();
    if (serialized.find((el: AlbumInterface) => el.name === albumToDelete.name)
    && serialized.find((el: AlbumInterface) => el.name === albumToDelete.name).origin === 'User') {
      serialized = serialized.filter((el: AlbumInterface) => el.name !== albumToDelete.name);
      albumDb.set('albums', serialized).write();
      return true;
    }
    return false;
  }

  private getSongs(songs: string[]): Song[] {
    const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serialized = songsDb.get('songs').value();

    return serialized
      .filter((song: SongInterface) => songs.includes(song.name))
      .map((song: SongInterface) => new Song(
        song.name,
        song.artist,
        song.seconds,
        song.genres,
        song.single,
        song.views,
      ));
  }

  private deserializeAlbums(albums: AlbumInterface[]) {
    albums.forEach((album) => {
      const songs: Song[] = this.getSongs(album.songs);
      const systemAlbum = new Album(
        album.name,
        album.artist,
        album.year,
        album.genres,
        songs,
      );
      this._albums.push(systemAlbum);
    });
  }
}
