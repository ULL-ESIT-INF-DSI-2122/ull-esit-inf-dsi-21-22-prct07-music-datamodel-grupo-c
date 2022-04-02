export class Song {
  private readonly _name: string;

  private _artist: string;

  private _seconds: number;

  private _genres: string[];

  private _single: boolean;

  private _views: number;

  constructor(
    name: string,
    artist: string = '',
    seconds: number = 0,
    genres: string[] = [],
    single: boolean = false,
    views: number = 0,
  ) {
    this._name = name;
    this._artist = artist;
    this._seconds = seconds;
    this._genres = genres;
    this._single = single;
    this._views = views;
  }

  get name(): string { return this._name; }

  get artist(): string { return this._artist; }

  set artist(value: string) { this._artist = value; }

  get seconds(): number { return this._seconds; }

  set seconds(value: number) { this._seconds = value; }

  get genres(): string[] { return this._genres; }

  set genres(value: string[]) { this._genres = value; }

  get single(): boolean { return this._single; }

  set single(value: boolean) { this._single = value; }

  get views(): number { return this._views; }

  set views(value: number) { this._views = value; }

  addGenre(value: string): void {
    this._genres.push(value);
  }

  removeGenre(value: string): void {
    this._genres = this._genres.filter((item: string) => item !== value);
  }
}
