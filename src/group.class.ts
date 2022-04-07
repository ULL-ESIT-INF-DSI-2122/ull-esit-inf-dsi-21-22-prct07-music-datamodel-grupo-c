/**
 * # Group Class
 * This class is in charge of managing the groups objects.
 * Group join the set of classes that make up the entire structure of a Playlist.
 *
 * ## Properties
 * - name | Group name.
 * - artists | Artists in the group.
 * - year | Year of creation of the group.
 * - genres | Genres related to the group.
 * - albums | Albums the group has released.
 * - monthlyListeners | Monthly listeners of the group.
 *
 * ## Methods
 * - get name() | Returns group name.
 * - get artists() | Returns the collection of artists of the group.
 * - set artists(value) | Set the collection of artists (value) of the group.
 * - get year() | Returns the year of creation of the group.
 * - get genres() | Returns the collection of genres related to the group.
 * - set genres(value) | Set the collection of genres related to the group.
 * - get albums() | Returns the collection of albums the group has released.
 * - set albums() | Set the collection of albums the group has released.
 * - get monthlyListeners() | Returns the number of monthly listeners.
 * - set monthlyListeners(value) | Set the number of monthly listeners.
 */
export class Group {
  private readonly _name: string;

  private _artists: string[];

  private readonly _year: number;

  private _genres: string[];

  private _albums: string[];

  private _monthlyListeners: number;

  constructor(
    name: string = '',
    artists: string[] = [],
    year: number = 0,
    genres: string[] = [],
    albums: string[] = [],
    monthlyListeners: number = 0
  ) {
    this._name = name;
    this._artists = artists;
    this._year = year;
    this._genres = genres;
    this._albums = albums;
    this._monthlyListeners = monthlyListeners;
  }

  get name(): string { return this._name; }

  get artists(): string[] { return this._artists; }

  set artists(value: string[]) { this._artists = value; }

  get year(): number { return this._year; }

  get genres(): string[] { return this._genres; }

  set genres(value: string[]) { this._genres = value; }

  get albums(): string[] { return this._albums; }

  set albums(value: string[]) { this._albums = value; }

  get monthlyListeners(): number { return this._monthlyListeners; }

  set monthlyListeners(value: number) { this._monthlyListeners = value; }
} 