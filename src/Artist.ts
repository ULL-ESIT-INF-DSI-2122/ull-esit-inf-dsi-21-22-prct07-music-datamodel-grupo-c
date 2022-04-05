import { Group } from './Group';
import { Album } from './Album';
import { Genre } from './Genre';
import { Song } from './Song';
/**
 * Artist Class.
 */
export class Artist {
    /**
     * @param listeners Artist listeners.
     */
    private listeners: number;
    /**
     * Artist class constructor.
     * @param name Artist name.
     * @param groups Groups to which the artist belong.
     * @param genres Genres that the Artist plays.
     * @param albums Artist albums.
     * @param songs Artist songs.
     */
    constructor(
        private name: string,
        private groups: Group [],
        private genres: Genre [],
        private albums: Album [],
        private songs: Song [],
    ){
        // The number of listeners is the sum of the listeners of the groups and their songs.
        this.listeners = 0;
        this.groups.forEach(group => { this.listeners += group.getListeners(); });
        this.songs.forEach(song => { this.listeners += song.getNumRepro(); });
    }
    /**
     * Getter function.
     * @returns The Artist name.
     */
    public getName(): string { return this.name; }
    /**
     * Getter function.
     * @returns The groups to which the artist belong
     */
    public getGroups(): Group [] { return this.groups; }
    /**
     * Getter function.
     * @returns Genres that the Artist plays.
     */
    public getGenres(): Genre [] { return this.genres; }
    /**
     * Getter function.
     * @returns Artist albums.
     */
    public getAlbums(): Album [] { return this.albums; }
    /**
     * Getter function.
     * @returns Artist songs.
     */
    public getSongs(): Song [] { return this.songs; }
    /**
     * Getter function.
     * @returns Artist listeners.
     */
    public getListeners(): number { return this.listeners; }
    /**
     * Setter function.
     * @param name New Artist name.
     */
    public setName(name: string): void { this.name = name; }
    /**
     * Setter function.
     * @param group Add a new Group for the Artist.
     */
    public setGroup(group: Group): void { this.groups.push(group); }
    /**
     * Setter function.
     * @param genre Add a new genre for the Artist.
     */
    public setGenre(genre: Genre): void { this.genres.push(genre); }
    /**
     * Setter function.
     * @param album Add a new album to the Artist.
     */
    public setAlbum(album: Album): void { this.albums.push(album); }
    /**
     * Setter function.
     * @param song Add a new song to the Artist.
     */
    public setSong(song: Song): void { this.songs.push(song); }
    /**
     * Setter function.
     * @param listeners Changes the number of listeners.
     */
    public setListeners(listeners: number): void { this.listeners = listeners; }
    /**
     * Add a number of listeners.
     * @param listeners Add new listeners to the total.
     */
    public addListeners(listeners: number): void { this.listeners += listeners; }
}