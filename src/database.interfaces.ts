interface GenreInterface {
  name: string,
  artists: string[],
  songs: string[],
  albums: string[],
  origin: string[],
}
interface ArtistInterface {
  name: string,
  groups: string[],
  genres: string[],
  albums: string[],
  songs: string[],
  listeners: number,
  origin: string,
}

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

export {
  GenreInterface,
  AlbumInterface,
  SongInterface,
  ArtistInterface,
};
