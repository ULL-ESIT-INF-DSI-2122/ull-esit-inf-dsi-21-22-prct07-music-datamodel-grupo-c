import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Genre } from './genre.class';
import { GenreInterface } from './database.interfaces';

export default class GenresManager {
  private _genres: Genre[];

  constructor() {
    this._genres = [];
    const playlistDb: lowdb.LowdbSync <GenreInterface> = lowdb(new FileSync('database/database-genres.json'));
    const serialized = playlistDb.get('genres').value();
    this.deserializeGenres(serialized);
  }

  get genres(): Genre[] { return this._genres; }

  public preview(): string {
    let output = 'GENRES\n\n';
    this.genres.forEach((genre) => {
      output += `${genre.name}\n`;
    });
    return output;
  }

  public genre(inx: number = 0): Genre { return this.genres[inx]; }

  public createGenre(genre: Genre) {
    if (!this._genres.find((el: Genre) => el.name === genre.name)) {
      const newGenre: Genre = new Genre(genre.name);
      this._genres.push(newGenre);
    }
  }

  public updateGenre(inx: number, genre: Genre) {
    this._genres[inx] = genre;
  }

  public saveGenre(inx: number) {
    const genreDb: lowdb.LowdbSync <GenreInterface> = lowdb(new FileSync('database/database-genres.json'));
    const genreToSave: Genre = this.genre(inx);
    const serialized = genreDb.get('genres').value();
    if (!serialized.find((el: GenreInterface) => el.name === genreToSave.name)) {
      serialized.push({
        name: genreToSave.name,
        artists: genreToSave.artists,
        songs: genreToSave.songs,
        albums: genreToSave.albums,
        origin: 'User',
      });
      genreDb.set('genres', serialized).write();
    }
  }

  public deleteGenre(inx: number): boolean {
    const genresDb: lowdb.LowdbSync <GenreInterface> = lowdb(new FileSync('database/database-genres.json'));
    const genreToDelete: Genre = this.genre(inx);
    let serialized = genresDb.get('genres').value();
    if (serialized.find((el: GenreInterface) => el.name === genreToDelete.name)
      && serialized.find((el: GenreInterface) => el.name === genreToDelete.name).origin === 'User') {
      serialized = serialized.filter((el: GenreInterface) => el.name !== genreToDelete.name);
      genresDb.set('genres', serialized).write();
      return true;
    }
    return false;
  }

  private deserializeGenres(genres: GenreInterface[]) {
    genres.forEach((genre) => {
      const systemGenre = new Genre(genre.name);
      this._genres.push(systemGenre);
    });
  }
}
