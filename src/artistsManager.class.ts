import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Artist } from './artist.class';
import { ArtistInterface, PlaylistInterface, SongInterface, AlbumInterface } from './database.interfaces';

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

  public viewArtistSongs(inx: number, desc: boolean = false): string {
    let output = `${this.artist(inx).name} songs:\n`;
    if (desc) {
      this.artist(inx).songs
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        })
        .reverse()
        .forEach((song) => {
          output += `${song}\n`;
        });
    } else {
      this.artist(inx).songs
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        })
        .forEach((song) => {
          output += `${song}\n`;
        });
    }
    return output;
  }

  public viewArtistSongsByViews(inx: number, desc: boolean = false): string {
    const songDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serialized: any = songDb.get('songs').value();

    let output = `${this.artist(inx).name} songs:\n`;
    if (desc) {
      serialized
        .filter((el: SongInterface) => el.artist === this.artist(inx).name)
        .sort((a: SongInterface, b: SongInterface) => a.views - b.views)
        .map((el: SongInterface) => el.name)
        .reverse()
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    } else {
      serialized
        .filter((el: SongInterface) => el.artist === this.artist(inx).name)
        .sort((a: SongInterface, b: SongInterface) => a.views - b.views)
        .map((el: SongInterface) => el.name)
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    }
    return output;
  }

  public viewArtistSongsSingles(inx: number): string {
    const songDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serialized: any = songDb.get('songs').value();

    let output = `${this.artist(inx).name} songs:\n`;
    serialized
      .filter((el: SongInterface) => el.artist === this.artist(inx).name && el.single)
      .map((el: SongInterface) => el.name)
      .forEach((song: string) => {
        output += `${song}\n`;
      });
    return output;
  }

  public viewArtistAlbums(inx: number, desc: boolean = false): string {
    let output = `${this.artist(inx).name} albums:\n`;
    if (desc) {
      this.artist(inx).albums
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        }).reverse()
        .forEach((song) => {
          output += `${song}\n`;
        });
    } else {
      this.artist(inx).albums
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        })
        .forEach((song) => {
          output += `${song}\n`;
        });
    }

    return output;
  }

  public viewArtistAlbumsByRelease(inx: number, desc: boolean = false): string {
    const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const serialized: any = albumDb.get('albums').value();

    let output = `${this.artist(inx).name} albums:\n`;
    if (desc) {
      serialized
        .filter((el: AlbumInterface) => el.artist === this.artist(inx).name)
        .sort((a: AlbumInterface, b: AlbumInterface) => a.year - b.year)
        .map((el: AlbumInterface) => el.name)
        .reverse()
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    } else {
      serialized
        .filter((el: AlbumInterface) => el.artist === this.artist(inx).name)
        .sort((a: AlbumInterface, b: AlbumInterface) => a.year - b.year)
        .map((el: AlbumInterface) => el.name)
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    }
    return output;
  }

  public artistPlaylists(inx: number): string[] {
    const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
    const serialized = playlistDb.get('playlists').value();
    return serialized
      .filter((playlist: PlaylistInterface) => playlist.artists.includes(this.artist(inx).name))
      .map((playlist: PlaylistInterface) => playlist.name);
  }

  public viewArtistPlaylists(inx: number, desc: boolean = false): string {
    let output = `${this.artist(inx).name} playlists:\n`;

    if (desc) {
      this.artistPlaylists(inx)
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        }).reverse()
        .forEach((song) => {
          output += `${song}\n`;
        });
    } else {
      this.artistPlaylists(inx)
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        })
        .forEach((song) => {
          output += `${song}\n`;
        });
    }
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

  public saveArtist(inx: number) {
    const artistDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
    const artistToSave: Artist = this.artist(inx);
    const serialized = artistDb.get('artists').value();
    if (!serialized.find((el: ArtistInterface) => el.name === artistToSave.name)) {
      serialized.push({
        name: artistToSave.name,
        groups: artistToSave.groups,
        genres: artistToSave.genres,
        albums: artistToSave.albums,
        songs: artistToSave.songs,
        origin: 'User',
      });
      artistDb.set('artists', serialized).write();
    }
  }

  public deleteArtist(inx: number): boolean {
    const artistDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
    const artistToDelete: Artist = this.artist(inx);
    let serialized = artistDb.get('artists').value();
    if (serialized.find((el: ArtistInterface) => el.name === artistToDelete.name)
      && serialized.find((el: ArtistInterface) => el.name === artistToDelete.name).origin === 'User') {
      serialized = serialized.filter((el: ArtistInterface) => el.name !== artistToDelete.name);
      artistDb.set('artists', serialized).write();
      return true;
    }
    return false;
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
