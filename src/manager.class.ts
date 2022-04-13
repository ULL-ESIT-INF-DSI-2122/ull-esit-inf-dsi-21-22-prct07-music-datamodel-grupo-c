import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
import { sortReflections } from 'typedoc/dist/lib/utils';
import { Song } from './song.class';
import { Album } from './album.class';

interface SongInterface {
  name: string,
  artist: string,
  seconds: number,
  genres: string[],
  single: boolean,
  views: number,
}

interface AlbumInterface {
  name: string,
  artist: string,
  year: number,
  genres: string[],
  songs: string[],
}

interface PlaylistInterface {
  name: string,
  songs: string[],
  albums: string[],
  genres: string[],
  artists: string[],
  groups: string[],
}

export default class PlaylistManager {
  private _playlists: Playlist[];

  constructor() {
    this._playlists = [];
    const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
    const serialized = playlistDb.get('playlists').value();
    this.deserializePlaylists(serialized);
    this._playlists.forEach((playlist, i) => {
      this.loadAlbum(playlist, serialized[i].albums);
      this.loadSongs(playlist, serialized[i].songs);
    });
  }

  get playlists(): Playlist[] { return this._playlists; }

  set playlists(value: Playlist[]) { this._playlists = value; }

  public addPlaylist(newPlaylist: Playlist): void {
    if (this._playlists
      .find((el) => el.name === newPlaylist.name)) {
      this._playlists.push(newPlaylist);
    }
  }

  public preview(): string {
    let output = 'NAME\t\tGENRES\t\tDURATION\n\n';
    this.playlists.forEach((playlist) => {
      output += `${playlist.name}\t\t`;
      output += `${playlist.genres.join(', ')}\t\t`;
      output += `${playlist.durationString}\n`;
    });
    return output;
  }

  // public createPlaylist(playlist: Playlist) {
  //   const newPlaylist: Playlist = new Playlist(playlist.name);
  //   // add songs queries
  // }
  //
  // public deletePlaylist(playlist: string) {
  //   // add songs queries
  // }
  //
  // public savePlaylist(playlist: string) {
  //   // add songs queries
  // }

  private deserializePlaylists(playlists: PlaylistInterface[]) {
    playlists.forEach((playlist) => {
      const systemPlaylist = new Playlist(playlist.name);
      this._playlists.push(systemPlaylist);
    });
  }

  private deserializeSongs(songs: SongInterface[], songsNames: string[]): Song[] {
    const playlistSongs: Song[] = [];
    songs.forEach((song) => {
      if (songsNames.includes(song.name)) {
        const playlistSong = new Song(
          song.name,
          song.artist,
          song.seconds,
          song.genres,
          song.single,
          song.views,
        );
        playlistSongs.push(playlistSong);
      }
    });
    return playlistSongs;
  }

  private deserializeAlbums(
    albums: AlbumInterface[],
    albumsNames: string[],
  ): Album[] {
    const playlistAlbums: Album[] = [];
    albums.forEach((album) => {
      if (albumsNames.includes(album.name)) {
        const db: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
        const serializedSongs = db.get('songs').value();
        const albumSongs: Song[] = this.deserializeSongs(serializedSongs, album.songs);
        const playlistAlbum = new Album(
          album.name,
          album.artist,
          album.year,
          album.genres,
          albumSongs,
        );
        playlistAlbums.push(playlistAlbum);
      }
    });
    return playlistAlbums;
  }

  private loadSongs(currentPlaylist: Playlist, songs: string[]) {
    const db: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serializedSongs = db.get('songs').value();
    this.deserializeSongs(serializedSongs, songs).forEach((song) => {
      currentPlaylist.addSong(song);
    });
  }

  private loadAlbum(currentPlaylist: Playlist, albums: string[]) {
    const db: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const serializedAlbums = db.get('albums').value();
    this.deserializeAlbums(serializedAlbums, albums).forEach((album) => {
      currentPlaylist.addAlbum(album);
    });
  }
}
