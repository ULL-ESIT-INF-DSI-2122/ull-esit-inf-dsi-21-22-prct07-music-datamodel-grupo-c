import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
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
  origin: string,
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
      // this.loadGenres(playlist, serialized[i].albums);
      // this.loadArtists(playlist, serialized[i].songs);
      // this.loadGroups(playlist, serialized[i].songs);
      playlist.sortBySongName();
    });
  }

  get playlists(): Playlist[] { return this._playlists; }

  set playlists(value: Playlist[]) { this._playlists = value; }

  public preview(): string {
    let output = 'NAME\t\tGENRES\t\tDURATION\n\n';
    this.playlists.forEach((playlist) => {
      output += `${playlist.name}\t\t`;
      output += `${playlist.genresName.join(', ')}\t\t`;
      output += `${playlist.durationString}\n`;
    });
    return output;
  }

  public playlist(inx: number = 0): Playlist {
    return this.playlists[inx];
  }

  public createPlaylist(playlist: Playlist, songList: Song[]) {
    if (!this._playlists.find((el: Playlist) => el.name === playlist.name)) {
      const newPlaylist: Playlist = new Playlist(playlist.name);
      playlist.songs.forEach((song) => {
        newPlaylist.addSong(song);
      });
      playlist.albums.forEach((album) => {
        newPlaylist.albums.push(album);
      });
      playlist.genres.forEach((genre) => {
        newPlaylist.addGenre(genre);
      });
      playlist.artists.forEach((artist) => {
        newPlaylist.addArtist(artist);
      });
      playlist.groups.forEach((group) => {
        newPlaylist.addGroup(group);
      });
      songList.forEach((song) => {
        newPlaylist.addSong(song);
      });
      this._playlists.push(newPlaylist);
    }
  }

  public savePlaylist(inx: number) {
    const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
    const playlistToSave: Playlist = this.playlist(inx);
    const serialized = playlistDb.get('playlists').value();
    if (!serialized.find((el: PlaylistInterface) => el.name === playlistToSave.name)) {
      serialized.push({
        name: playlistToSave.name,
        songs: playlistToSave.songsName,
        albums: playlistToSave.allAlbumNames,
        genres: playlistToSave.genresName,
        artists: playlistToSave.artistsName,
        groups: playlistToSave.allGroupNames,
        origin: 'User',
      });
      playlistDb.set('playlists', serialized).write();
    }
  }

  public deletePlaylist(inx: number): boolean {
    const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
    const playlistToDelete: Playlist = this.playlist(inx);
    let serialized = playlistDb.get('playlists').value();
    if (serialized.find((el: PlaylistInterface) => el.name === playlistToDelete.name)
      && serialized.find((el: PlaylistInterface) => el.name === playlistToDelete.name).origin === 'User') {
      serialized = serialized.filter((el: PlaylistInterface) => el.name !== playlistToDelete.name);
      playlistDb.set('playlists', serialized).write();
      return true;
    }
    return false;
  }

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
