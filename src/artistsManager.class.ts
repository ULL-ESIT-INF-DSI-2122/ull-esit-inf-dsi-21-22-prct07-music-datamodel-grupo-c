import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Artist } from './artist.class';

interface ArtistInterface {
  name: string,
  groups: string[],
  genres: string[],
  albums: string[],
  songs: string[],
  listeners: number,
  origin: string,
}

export default class ArtistsManager {
  private _artists: Artist[];

  constructor() {
    this._artists = [];
    const artistDb: lowdb.LowdbSync <ArtistsManager> = lowdb(new FileSync('database/database-artists.json'));
    const serialized: any = artistDb.get('artists').value();
    this.deserializeArtists(serialized);
  }

  get artists(): Artist[] { return this._artists; }

  set artists(value: Artist[]) { this._artists = value; }

  public preview(): string {
    let output = 'NAME\t\tGENRES\t\tLISTENERS\n\n';
    this.artists.forEach((artist) => {
      output += `${artist.name}\t\t`;
      output += `${artist.genres.join(', ')}\t\t`;
      output += `${artist.listeners}\n`;
    });
    return output;
  }

  public artist(inx: number = 0): Artist { return this.artists[inx]; }

  public createArtist(artist: Artist) {
    if (!this._artists.find((el: Artist) => el.name === artist.name)) {
      const newArtist: Artist = new Artist(
        artist.name,
        artist.groups,
        artist.genres,
        artist.albums,
        artist.songs,
        artist.listeners,
      );
      this._artists.push(newArtist);
    }
  }

  public updateArtist(inx: number, artist: Artist) {
    this._artists[inx] = artist;
  }

  private deserializeArtists(artists: ArtistInterface[]) {
    artists.forEach((artist) => {
      const systemArtists = new Artist(
        artist.name,
        artist.groups,
        artist.genres,
        artist.albums,
        artist.songs,
        artist.listeners,
      );
      this._artists.push(systemArtists);
    });
  }
}
