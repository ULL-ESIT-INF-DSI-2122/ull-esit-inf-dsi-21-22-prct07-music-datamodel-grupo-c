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
}
