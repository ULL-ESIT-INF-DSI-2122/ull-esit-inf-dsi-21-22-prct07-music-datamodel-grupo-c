export class Playlist {
  private readonly _name: string;

  private _songs: string[];

  private _duration: number;

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
    this._genres = genres;
  }

}
