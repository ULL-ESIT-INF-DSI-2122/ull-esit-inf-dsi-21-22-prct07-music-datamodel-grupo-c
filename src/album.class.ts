export class Album {
  private readonly _name: string;

  private readonly _artist: string;

  private readonly _year: number;

  private _genres: string[];

  private _songs: string[];

  constructor(
    name: string,
    artist: string = '',
    year: number,
    genres: string[] = [],
    songs: string[] = [],
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
}