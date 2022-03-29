import { Artist } from './Artist';
import { Group } from './Group';
import { Genre } from './Genre';
import { Song } from './Song';
/**
 * Album class.
 */
export class Album {
    /**
     * Album class constructor.
     * @param name Album's name.
     * @param author Album's author.
     * @param year Published year.
     * @param genres Genres to which the album belongs.
     * @param songs Songs on the Album.
     */
    constructor(
        private name: string,
        private author: (Artist | Group),
        private year: number,
        private genres: Genre [],
        private songs: Song []
    ){}
    /**
     * Getter function.
     * @returns Album's name.
     */
    public getName(): string { return this.name; }
    /**
     * Getter function.
     * @returns Albums's author, whether artist or group.
     */
    public getAuthor(): (Artist | Group) { return this.author; }
    /**
     * Getter function.
     * @returns Published Year.
     */
    public getYear(): number { return this.year; }
    /**
     * Getter function.
     * @returns Genres to which the album belongs.
     */
    public getGenres(): Genre [] { return this.genres; }
    /**
     * Getter function.
     * @returns Songs on the album.
     */
    public getSongs(): Song [] { return this.songs; }
    /**
     * Setter function.
     * @param name New album's name.
     */
    public setName(name: string): void { this.name = name; }
    /**
    * Setter function.
    * @param author New album's author.
     */
    public setAuthor(author: Artist | Group): void { this.author = author; }
    /**
     * Setter function.
     * @param year New album's year.
     */
    public setYear(year: number): void { this.year = year; }
    /**
     * Setter function.
     * @param genre New album's genre.
     */
    public setGenre(genre: Genre): void { this.genres.push(genre); }
    /**
     * Setter function.
     * @param song Adding a song to the Album.
     */
    public setSong(song: Song): void { this.songs.push(song); }
}