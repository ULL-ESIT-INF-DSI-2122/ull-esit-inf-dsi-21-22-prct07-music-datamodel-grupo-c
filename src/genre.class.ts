/**
 * # Genre Class
 * This class determines which genres appear in songs, groups and artists.
 * Joins with the set of classes that make up the Playlist.
 *
 * ## Properties
 * - name | Genre name.
 * - artists | Artists related to the genre.
 * - songs | Songs related to the genre.
 * - albums | Albums related to the genre.
 *
 * ## Methods
 * - get name() | Returns the genre name.
 * - get artists() | Returns the artists related to the genre.
 * - set artists(value) | Set the artists related to the genre.
 * - get songs() | Returns the songs related to the genre.
 * - set songs(value) | Set the songs related to the genre.
 * - get albums() | Returns the albums related to the genre.
 * - set albums(value) | Set the albums related to the genre.
 * - addArtist(name) | Add an artist to the collection of artists related to the genre.
 * - addAlbum(name) | Add an album to the collection of albums related to the genre.
 * - addSong(name) | Add a song to the collection of songs related to the genre.
 * - removeArtist(name) | Remove an artist from the collection of artists related to the genre.
 * - removeArtistAt(pos) | Remove an artist from a position in the collection.
 * - removeSong(name) | Remove a song from the collection of songs related to the genre.
 * - removeSongAt(pos) | Remove a song in from a position.
 * - removeAlbum(name) | Remove an album from the collection of albums related to the genre.
 * - removeAlbumAt(pos) | Remove a album in from a position.
 */
export class Genre {
  private readonly _name: string;

  private _artists: string[];

  private _songs: string[];

  private _albums: string[];

  constructor(
    name: string,
    artists: string[] = [],
    songs: string[] = [],
    albums: string[] = [],
  ) {
    this._name = name;
    this._artists = artists;
    this._songs = songs;
    this._albums = albums;
  }

  get name(): string { return this._name; }

  get artists(): string[] { return this._artists; }

  set artists(value: string[]) { this._artists = value; }

  get songs(): string[] { return this._songs; }

  set songs(value: string[]) { this._songs = value; }

  get albums(): string[] { return this._albums; }

  set albums(value: string[]) { this._albums = value; }

  public addArtist(name: string): void { this._artists.push(name); }

  public addAlbum(name: string): void { this._albums.push(name); }

  public addSong(name: string): void { this._songs.push(name); }

  public removeArtist(name: string): void {
    this._artists = this._artists.filter((el) => el !== name);
  }

  public removeArtistAt(pos: number): void {
    this._artists = this._artists.filter((_, i) => i !== pos);
  }

  public removeSong(name: string): void {
    this._songs = this._songs.filter((el) => el !== name);
  }

  public removeSongAt(pos: number): void {
    this._songs = this._songs.filter((_, i) => i !== pos);
  }

  public removeAlbum(name: string): void {
    this._albums = this._albums.filter((el) => el !== name);
  }

  public removeAlbumAt(pos: number): void {
    this._albums = this._albums.filter((_, i) => i !== pos);
  }
}
