/**
 * # Song Class
 * This class is in charge of managing the song objects,
 * which are joined to the set of classes to form the playlist.
 *
 * ## Properties
 * - name | Song name.
 * - artist | Song artist.
 * - seconds | Duration in seconds of the song.
 * - genres | Genres related to the song, it could be more than one.
 * - single | If the song is a single or appear in a album.
 * - views | Song number of views.
 *
 * ## Methods
 * - get name() | Returns song name.
 * - get artist() | Returns song artist.
 * - get seconds() | Returns song duration in seconds.
 * - get genres() | Returns all the genres related to the song.
 * - set genres(value) | Set the genres (in value) related to the song.
 * - get single() | Returns true if the song is a single, and false if is not.
 * - get views() | Returns the number of views of the song.
 * - set views() | Set the song number of views.
 * - addGenre(value) | Add on genre (value) to the collection of genres related to the song.
 * - addOneView() | Add one view to the total of views.
 * - removeGenre(value) | Remove a genre from the collection of genres related to the song.
 */
export class Song {
  private readonly _name: string;

  private readonly _artist: string;

  private readonly _seconds: number;

  private _genres: string[];

  private readonly _single: boolean;

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

  get seconds(): number { return this._seconds; }

  get genres(): string[] { return this._genres; }

  set genres(value: string[]) { this._genres = value; }

  get single(): boolean { return this._single; }

  get views(): number { return this._views; }

  set views(value: number) { this._views = value; }

  addGenre(value: string): void {
    this._genres.push(value);
  }

  addOneView(): void {
    this.views += 1;
  }

  removeGenre(value: string): void {
    this._genres = this._genres.filter((item: string) => item !== value);
  }
}
