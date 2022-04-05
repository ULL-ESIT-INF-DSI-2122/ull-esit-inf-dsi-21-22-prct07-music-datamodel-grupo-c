/**
 * # Playlist class.
 * Playlist class containing all the songs to be played.
 * 
 * ## Properties
 * - name | Playlist name.
 * - songs | Name of the songs on the playlist.
 * - duration | Duration in seconds of the playlist.
 * - hours | Duration in hours of the playlist (it updates automatically).
 * - minutes | Duration in 
 */
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
    this._hours = Number((duration / 3600).toFixed(0));
    this._minutes = Number(((duration - this._hours * 3600) / 60).toFixed(0));
    this._genres = genres;
  }

  get name(): string { return this._name; }

  get songs(): string[] { return this._songs; }

  set songs(songs: string[]) { this._songs = songs; }

  get duration(): number { return this._duration; }

  set duration(duration: number) {
    this._duration  = duration;
    this._hours = Number((duration / 3600).toFixed(0));
    this._minutes = Number(((duration - this._hours * 3600) / 60).toFixed(0));
  }

  get hours(): number { return this._hours; }

  get minutes(): number { return this._minutes; }

  get genres(): string[] { return this._genres; }

  set genres(genres: string[]) { this._genres = genres; }

  public addGenre(genre: string): void { this._genres.push(genre); }

  public addSong(song: string): void { this._songs.push(song); }

  public removeGenre(genre: string) {
    this._genres = this._genres.filter((item: string) => item !== genre);
  }

  public removeSong(song: string) {
    this._songs = this._songs.filter((item: string) => item !== song);
  }
}
