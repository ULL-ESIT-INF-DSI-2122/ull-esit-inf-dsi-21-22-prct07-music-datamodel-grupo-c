/**
* # Artist Class.
* Artist class that belongs to the collection of classes in the Playlist.
* It stands for the author of songs or group participants.
 *
 * ## Properties
 * - name | Artist name.
 * - groups | Groups where the artist belongs.
 * - genres | Genres the artist plays.
 * - albums | Artist albums.
 * - songs | Artist songs.
 * - listeners | Is the sum of all the songs and the groups the artists belongs (monthly).
 *
 * ## Methods
 * -  get name() | Returns the artist name.
 * -  get groups() | Returns the groups where the artist participate.
 * -  set groups() | Set the groups where the artist participate.
 * -  get genres() | Returns the artist genres.
 * -  set genres() | Set the genres which the artist plays.
 * -  get albums() | Returns the artist albums.
 * -  set albums() | Set the albums that belongs to the artist.
 * -  get songs() | Returns the artist songs.
 * -  set songs() | Set the songs the artist plays.
 * -  get listeners() | Returns the artist listeners.
 * -  set listeners() | Set the listeners the artist has.
 * -  addListeners(value) | Add the number of listeners from the param value to the total listeners.
 */
export class Artist {
  private readonly _name: string;

  private _groups: string[];

  private _genres: string[];

  private _albums: string[];

  private _songs: string[];

  private _listeners: number;

  constructor(
    name: string,
    groups: string[],
    genres: string[],
    albums: string[],
    songs: string[],
    listeners: number,
  ) {
    this._name = name;
    this._groups = groups;
    this._genres = genres;
    this._albums = albums;
    this._songs = songs;
    this._listeners = listeners;
  }

  get name(): string { return this._name; }

  get groups(): string[] { return this._groups; }

  set groups(groups: string[]) { this._groups = groups; }

  get genres(): string[] { return this._genres; }

  set genres(genres: string[]) { this._genres = genres; }

  get albums(): string[] { return this._albums; }

  set albums(albums: string[]) { this._albums = albums; }

  get songs(): string[] { return this._songs; }

  set songs(songs: string[]) { this._songs = songs; }

  get listeners(): number { return this._listeners; }

  set listeners(listeners: number) { this._listeners = listeners; }

  public addListeners(value: number): void { this._listeners += value; }
}
