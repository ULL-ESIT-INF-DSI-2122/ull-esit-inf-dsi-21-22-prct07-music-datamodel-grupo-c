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
}