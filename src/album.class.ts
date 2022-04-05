/**
* # Album Class.
* Album class that belongs to the collection of classes in the Playlist.
* It stands for the albums that contains songs.
 *
 * ## Properties
 * - name | Album name.
 * - artist | Album artist.
 * - year | Year when the album was published.
 * - genres | Album genres.
 * - songs | Songs on the album.
 *
 * ## Methods
 * -  get name() | Returns the album name.
 * -  get artist() | Returns the album artist.
 * -  get year() | Returns the year when the album was published.
 * -  get genres() | Returns the genres that belongs to the album.
 * -  set genres() | Set the genres of the album.
 * -  get songs() | Returns the songs on the album.
 * -  set songs() | Set the songs on the album.
 * -  addGenre(genre) | Add a new genre to the album.
 * -  addSong(song) | Add a new song to the album.
 * -  removeGenre(genre) | Remove a genre from the genre collecion.
 * -  removeSong(song) | Remove a song from the song collecion.
 */
export class Album {
  private readonly _name: string;

  private readonly _artist: string;

  private readonly _year: number;

  private _genres: string[];

  private _songs: string[];

  constructor(
    name: string,
    year: number,
    genres: string[] = [],
    songs: string[] = [],
    artist: string = '',
  ) {
    this._name = name;
    this._artist = artist;
    this._year = year;
    this._genres = genres;
    this._songs = songs;
  }

  get name(): string { return this._name; }

  get artist(): string { return this._artist; }

  get year(): number { return this._year; }

  get genres(): string[] { return this._genres; }

  set genres(genres: string[]) { this._genres = genres; }

  get songs(): string[] { return this._songs; }

  set songs(songs: string[]) { this._songs = songs; }

  public addGenre(genre: string): void { this._genres.push(genre); }

  public addSong(song: string): void { this._songs.push(song); }

  public removeGenre(genre: string): void {
    this._genres = this._genres.filter((item: string) => item !== genre);
  }

  public removeSong(song: string): void {
    this._songs = this._songs.filter((item: string) => item !== song);
  }
}
