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
