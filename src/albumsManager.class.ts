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
