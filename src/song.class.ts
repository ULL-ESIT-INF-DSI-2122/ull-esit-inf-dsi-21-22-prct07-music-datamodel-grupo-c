export class Song {
  private readonly _name: string;
  private _artist: string;
  private _seconds: number;
  private _genres: string[];
  private _single: boolean;
  private _views: number;

  constructor(
    name: string,
    artist: string,
    seconds: number,
    genres: number,
    single: boolean,
    views: number,
  ) {
    this._name = name;
    this._artist = artist;
    this._seconds = seconds;
    this._genres = genres;
    this._single = single;
    this._views = views;
  }
}
