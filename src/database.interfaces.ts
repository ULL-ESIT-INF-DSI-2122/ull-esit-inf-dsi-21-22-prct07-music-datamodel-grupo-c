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

interface GroupInterface {
  name: string,
  artists: string[],
  year: number,
  genres: string[],
  albums: string[];
  monthlyListeners: number,
  origin: string[],
}

interface SongInterface {
  name: string,
  artist: string,
  seconds: number,
  genres: string[],
  single: boolean,
  views: number,
  origin: string,
}

interface AlbumInterface {
  name: string,
  artist: string,
  year: number,
  genres: string[],
  songs: string[],
  origin: string,
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

export {
  GenreInterface,
  AlbumInterface,
  SongInterface,
  ArtistInterface,
  GroupInterface,
  PlaylistInterface,
};
