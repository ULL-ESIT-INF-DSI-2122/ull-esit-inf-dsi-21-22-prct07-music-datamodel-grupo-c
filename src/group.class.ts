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
    monthlyListeners: number = 0,
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

  addArtist(artist: string): void { this._artists.push(artist); }

  addGenre(genre: string): void { this._genres.push(genre); }

  addAlbums(albums: string): void { this._albums.push(albums); }

  deleteArtist(artist: string) {
    this._artists = this._artists.filter((element: string) => element !== artist);
  }

  deleteGenre(genre: string) {
    this._genres = this._genres.filter((element: string) => element !== genre);
  }

  deleteAlbum(album: string) {
    this._albums = this._albums.filter((element: string) => element !== album);
  }
}
