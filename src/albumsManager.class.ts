import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Album } from "./album.class";
import { Song } from "./song.class";

interface AlbumInterface {
  name: string;
  artist: string;
  year: number;
  genres: string[];
  songs: Song[];
  origin: string[];
}

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

  public saveAlbum(index: number) {
    const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const albumToSave: Album = this.album(index);
    const serialized = albumDb.get('albums').value();
    if (!serialized.find((el: AlbumInterface) => el.name === albumToSave.name)) {
      serialized.push({
        name: albumToSave.name,
        artists: albumToSave.artist,
        year: albumToSave.year,
        genres: albumToSave.genres,
        songs: albumToSave.songs,
        origin: 'User',
      });
      albumDb.set('albums', serialized).write();
    }
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

  private deserializeAlbums(albums: AlbumInterface[]) {
    albums.forEach((album) => {
      const systemAlbum = new Album(
        album.name,
        album.artist,
        album.year,
        album.genres,
        album.songs,
      );
      this._albums.push(systemAlbum);
    });
  }
}
