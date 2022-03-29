import { Artist } from './Artist';
import { Genre } from './Genre';
import { Album } from './Album';
/**
 * Group Class.
 */
export class Group {
    /**
     * Group class constructor.
     * @param name Name of the Group.
     * @param artists Artists on the Group.
     * @param year Group creation date.
     * @param genres Genres to which the group belongs.
     * @param albums Albums of the Group.
     * @param listeners Number of listeners of the group.
     */
    constructor(
        private name: string,
        private artists: Artist [],
        private year: number,
        private genres: Genre [],
        private albums: Album [],
        private listeners: number
    ){}
    /**
     * Getter function.
     * @returns The Group name.
     */
    public getName(): string { return this.name; }
    /**
     * Getter function.
     * @returns Artists on the Group
     */
    public getArtists(): Artist [] { return this.artists; }
    /**
     * Getter function.
     * @returns Group creation date.
     */
    public getYear(): number { return this.year; }
    /**
     * Getter function.
     * @returns Genres to which the group belongs.
     */
    public getGenres(): Genre [] { return this.genres; }
    /**
     * Getter function.
     * @returns Albums of the Group
     */
    public getAlbums(): Album [] { return this.albums; }
    /**
     * Getter function.
     * @returns Number of listeners of the group
     */
    public getListeners(): number { return this.listeners; }
    /**
     * Setter function.
     * @param name New Group name.
     */
    public setName(name: string): void { this.name = name; }
    /**
     * Setter function.
     * @param artist New artist of the Group.
     */
    public setArtist(artist: Artist): void { this.artists.push(Artist); }
    /**
     * Setter function.
     * @param year New Group creation year.
     */
    public setYear(year: number): void { this.year = year; }
    /**
     * Setter function.
     * @param genre New Group genre.
     */
    public setGenre(genre: Genre): void { this.genres.push(genre); }
    /**
     * Setter function.
     * @param album New Group Album.
     */
    public setAlbum(album: Album): void { this.albums.push(album); }
    /**
     * 
     * @param listeners New number of listeners of the Group.
     */
    public setListeners(listeners: number): void { this.listeners = listeners; }
}