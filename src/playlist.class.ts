import * as uuid from 'uuid';
import { Song } from './song.class';
import { Album } from './album.class';
import { Group } from './group.class';
import { Genre } from './genre.class';
import { Artist } from './artist.class';

/**
 * # Playlist class.
 * Playlist class containing all the songs to be played.
 *
 * ## Properties
 * - name | Playlist name.
 * - songs | Name of the songs on the playlist.
 * - duration | Duration in seconds of the playlist.
 * - hours | Hours of the playlist duration (it updates automatically).
 * - minutes | Minutes of the playlist duration.
 * - genres | Genres that appears in the playlist.
 *
 * ## Methods
 * - get name() | Returns Playlist name.
 * - get songs() | Returns all the songs in the playlist.
 * - set songs() | Set the songs on the playlist.
 * - get duration() | Returns the playlist duration in seconds.
 * - set duration(duration) | Set the duration (updates the hours and minutes automatically).
 * - get hours() | Returns the duration in hours of the playlist.
 * - get minutes() | Returns the minutes duration of the playlist.
 * - get genres() | Returns the genres on the playlist.
 * - set genres(genres) | Set the playlist genres.
 * - addGenre(genre) | Add a genre to the playlist.
 * - addSong(song) | Add a song to the playlist.
 * - removeGenre(genre) | Remove a genre from the playlist.
 * - removeSong(song) | Remove a song from the playlist.
 */

export default class Playlist {
  private readonly _id: string;

  private _name: string;

  private _songs: Song[];

  private _albums: Album[];

  private _genres: Genre[];

  private _artists: Artist[];

  private _groups: Group[];

  constructor(name: string) {
    this._id = uuid.v4().toString();
    this._name = name;
    this._songs = [];
    this._albums = [];
    this._genres = [];
    this._artists = [];
    this._groups = [];
  }

  get id(): string { return this._id; }

  get name(): string { return this._name; }

  set name(value: string) { this._name = value; }

  get songs(): Song[] { return this._songs; }

  get allSongsNames(): string[] { return this.songs.map((el) => el.name); }

  get albums(): Album[] { return this._albums; }

  get allAlbumNames(): string[] { return this.albums.map((el) => el.name); }

  get genres(): Genre[] { return this._genres; }

  get artists(): Artist[] { return this._artists; }

  get groups(): Group[] { return this._groups; }

  get allGroupNames(): string[] { return this.groups.map((el) => el.name); }

  // Duration
  get seconds(): number {
    return this._songs.length === 0
      ? 0
      : this._songs
        .map((song) => song.seconds)
        .reduce((acc, num) => acc + num);
  }

  get minutes(): number { return Math.floor(this.seconds / 60); }

  get hours(): number { return Math.floor(this.minutes / 60); }

  get duration(): { h: number, m: number, s: number } {
    return {
      h: this.hours,
      m: this.minutes - this.hours * 60,
      s: this.seconds - this.minutes * 60 - this.hours * 3600,
    };
  }

  get durationString(): string {
    return `${Math.round(this.hours)} hr `
         + `${Math.round(this.minutes % 60)} min `
         + `${Math.round(this.seconds % 60)} sec`;
  }

  get length(): number { return this.songs.length; }

  private addArtist(artist: Artist): void {
    if (!this.artists.includes(artist)) {
      this.artists.push(artist);
    }
  }

  private addGenre(genre: string): void {
    if (!this.genres.includes(genre)) {
      this.genres.push(genre);
    }
  }

  public addSong(newSong: Song): void {
    if (!this.songs.find((el) => el === newSong)) {
      this.songs.push(newSong);
      if (!this.artists.find((artist) => artist === newSong.artist)) {
        this.artists.push(newSong.artist);
      }
      newSong.genres.forEach((genre) => {
        if (!this.genres.find((el) => el === genre)) {
          this.genres.push(genre);
        }
      });
    }
  }

  public removeSong(songName: string): void {
    if (this.songs.find((song) => song.name === songName)) {
      // @ts-ignore
      this.songs
        .find((song) => song.name === songName)
        .genres
        .forEach((genre) => {
          this._genres = this._genres.filter((el) => el !== genre);
        });
      this._songs = this.songs.filter((song) => song.name !== songName);
    }
  }

  public addAlbum(newAlbum: Album): void {
    if (!this.albums.find((album) => album === newAlbum)) {
      this.albums.push(newAlbum);
      this.addArtist(newAlbum.artist);
      newAlbum.songs.forEach((song) => {
        if (
          this.songs.includes(song)
          && this.searchAlbumBySong(song) === undefined
        ) {
          song.single = false; // eslint-disable-line
        }
        this.addSong(song);
      });
    }
  }

  public removeAlbum(albumName: string): void {
    if (this.albums.find((album) => album.name === albumName)) {
      // @ts-ignore
      this.albums
        .find((album) => album.name === albumName)
        .songs
        .forEach((song) => {
          this.removeSong(song.name);
        });

      this._artists = this.artists
        .filter(// @ts-ignore
          (artist) => artist !== this
            .albums
            .find((album) => album.name === albumName)
            .artist,
        );
      this.songs.forEach((song) => {
        this.addArtist(song.artist);
        song.genres.forEach((genre) => {
          this.addGenre(genre);
        });
      });
      this._albums = this.albums.filter((album) => album.name !== albumName);
    }
  }

  public searchAlbumBySong(song: Song): Album | undefined {
    return this.albums.find((album) => album.songs.includes(song));
  }

  public sortBySongName(reverse: boolean = false): void {
    this._songs = !reverse
      ? this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.name.toLowerCase();
          const b = songB.name.toLowerCase();
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
      : this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.name.toLowerCase();
          const b = songB.name.toLowerCase();
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
        .reverse();
  }

  public sortBySongDuration(reverse: boolean = false): void {
    this._songs = !reverse
      ? this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.seconds;
          const b = songB.seconds;
          return a - b;
        })
      : this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.seconds;
          const b = songB.seconds;
          return a - b;
        })
        .reverse();
  }

  public sortByGenre(reverse: boolean = false): void {
    this._songs = !reverse
      ? this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.genres.join('').toLowerCase();
          const b = songB.genres.join('').toLowerCase();
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
      : this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.genres.join('').toLowerCase();
          const b = songB.genres.join('').toLowerCase();
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
        .reverse();
  }

  public sortBySongViews(reverse: boolean = false): void {
    this._songs = !reverse
      ? this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.views;
          const b = songB.views;
          return a - b;
        })
      : this._songs
        .sort((songA: Song, songB: Song) => {
          const a = songA.views;
          const b = songB.views;
          return a - b;
        })
        .reverse();
  }

  public sortByAlbumName(reverse: boolean = false): void {
    this._songs = !reverse
      ? this._songs
        .sort((songA: Song, songB: Song) => {
          const a = this.searchAlbumBySong(songA) === undefined
            ? ''
            // @ts-ignore
            : this.searchAlbumBySong(songA).name;
          const b = this.searchAlbumBySong(songB) === undefined
            ? ''
            // @ts-ignore
            : this.searchAlbumBySong(songB).name;

          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
      : this._songs
        .sort((songA: Song, songB: Song) => {
          const a = this.searchAlbumBySong(songA) === undefined
            ? ''
            // @ts-ignore
            : this.searchAlbumBySong(songA).name;
          const b = this.searchAlbumBySong(songB) === undefined
            ? ''
            // @ts-ignore
            : this.searchAlbumBySong(songB).name;

          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
        .reverse();
  }

  public sortByAlbumRelease(reverse: boolean = false): void {
    this._songs = !reverse
      ? this._songs
        .sort((songA: Song, songB: Song) => {
          const a: number = this.searchAlbumBySong(songA) === undefined
            ? 0
            // @ts-ignore
            : this.searchAlbumBySong(songA).year;
          const b: number = this.searchAlbumBySong(songB) === undefined
            ? 0
            // @ts-ignore
            : this.searchAlbumBySong(songB).year;

          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
      : this._songs
        .sort((songA: Song, songB: Song) => {
          const a: number = this.searchAlbumBySong(songA) === undefined
            ? 0
            // @ts-ignore
            : this.searchAlbumBySong(songA).year;
          const b: number = this.searchAlbumBySong(songB) === undefined
            ? 0
            // @ts-ignore
            : this.searchAlbumBySong(songB).year;

          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })
        .reverse();
  }

  public toString(): string {
    let playListString: string = `${this.name.toUpperCase()}\n`;
    playListString += `\t(${this.genres.join(', ')})\n`;
    playListString += `${this.length} songs | ${this.durationString}\n\n`;
    playListString += '#\tTitle\t\t\tAlbum\t\tDuration\n';
    this.songs.forEach((song, inx) => {
      playListString += `${inx + 1}\t${song.name}\t\t`
        + `${this.searchAlbumBySong(song) === undefined
          ? song.name
          // @ts-ignore
          : this.searchAlbumBySong(song).name}\t`
        + `${song.durationString}\n`;
      playListString += ` \t${song.artist}\n`;
    });
    playListString += '\n';
    return playListString;
  }
}
