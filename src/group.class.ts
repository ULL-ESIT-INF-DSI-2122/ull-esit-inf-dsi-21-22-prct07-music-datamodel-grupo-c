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

  get year(): number { return this._year; }

  get genres(): string[] { return this._genres; }

  get albums(): string[] { return this._albums; }

  get monthlyListeners(): number { return this._monthlyListeners; }
} 