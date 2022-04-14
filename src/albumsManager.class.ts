import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Album } from "./album.class";

interface AlbumInterface {
  name: string;
  artists: string[];
  year: number;
  genres: string[];
  songs: string[];
  origin: string[];
}

export default class AlbumsManager {
  private _albums: Album[];

  constructor() {
    this._albums = [];
    const albumDb: lowdb.LowdbSync<AlbumInterface> = lowdb(new FileSync("database/database-albums.json"));
    const serialized = albumDb.get("albums").value();
    this.deserializeAlbums(serialized);
  }
}
