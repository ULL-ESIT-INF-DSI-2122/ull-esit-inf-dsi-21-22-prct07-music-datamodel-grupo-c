/**
 * Artist Class.
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