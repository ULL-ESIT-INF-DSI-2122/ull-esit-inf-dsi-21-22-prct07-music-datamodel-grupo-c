import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Album } from './album.class';

interface AlbumInterface {
    name: string,
    artists: string[],
    year: number,
    genres: string[],
    songs: string[];
    origin: string[],
}

export default class AlbumsManager {
    
}