export class Playlist {
  private readonly _name: string;

  private _songs: string[];

  private _duration: number;

  private _hours: number;

  private _minutes: number;

  private _genres: string[];

  constructor(
    name: string,
    songs: string[],
    duration: number,
    genres: string[],
  ) {
    this._name = name;
    this._songs = songs;
    this._duration = duration;
    this._hours = Number((duration / 3600).toFixed(1));
    this._minutes = Number((duration / 60).toFixed(1));
    this._genres = genres;
  }

  get name(): string { return this._name; }

  get songs(): string[] { return this._songs; }

  set songs(songs: string[]) { this._songs = songs; }

  get duration(): number { return this._duration; }

  set duration(duration: number) {
    this._duration  = duration;
    this._hours = Number((duration / 3600).toFixed(1));
    this._minutes = Number((duration / 60).toFixed(1));
  }

  get hours(): number { return this._hours; }

  get minutes(): number { return this._minutes; }

  get genres(): string[] { return this._genres; }

  set genres(genres: string[]) { this._genres = genres; }

  public addGenre(genre: string): void { this._genres.push(genre); }

  public removeGenre(genre: string) {
    this._genres = this._genres.filter((item: string) => item !== genre);
  }
}
