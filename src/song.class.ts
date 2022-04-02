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
}
