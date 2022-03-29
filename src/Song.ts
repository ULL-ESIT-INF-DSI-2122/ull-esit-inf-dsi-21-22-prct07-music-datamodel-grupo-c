import { Artist } from './Artist';
import { Group } from './Group';
import { Genre } from './Genre'
/**
 * Song Class.
 */
export class Song {
    /**
     * Song class constructor.
     * @param name Song's name.
     * @param author Author's name.
     * @param duration Duration of the song.
     * @param genre Genres to which the song belongs.
     * @param single If the song is a single or not.
     * @param numRepro Number of reproductions.
     */
    constructor(
        private name: string,
        private author: (Artist | Group),
        private duration: string,
        private genre: Genre[],
        private single: boolean,
        private numRepro: number
    ){}
    /**
     * Getter function.
     * @returns The song's name.
     */
    public getName(): string { return this.name; }
    /**
     * Getter function.
     * @returns Song's author, whether artist or group.
     */
    public getAuthor(): Artist | Group { return this.author; }
    /**
     * Getter function.
     * @returns Song's duration in minutes and seconds.
     */
    public getDuration(): string { return this.duration; }
    /**
     * Getter function.
     * @returns Genres to which the song belongs.
     */
    public getGenre(): Genre [] { return this.genre; }
    /**
     * Getter function.
     * @returns If the song is a single or not.
     */
    public getIfSingle(): boolean { return this.single; }
    /**
     * Getter function.
     * @returns Song's number of reproductions.
     */
    public getNumRepro(): number { return this.numRepro; }
    /**
     * Setter function.
     * @param name New song's name.
     */
    public setName(name: string): void { this.name = name; }
    /**
     * Setter function.
     * @param author New song's author.
     */
    public setAuthor(author: Artist | Group): void { this.author = author; }
    /**
     * Setter function.
     * @param duration New song's duration.
     */
    public setDuration(duration: string): void { this.duration = duration; }
    /**
     * Setter function.
     * @param genre New song's genre.
     */
    public setGenre(genre: Genre): void { this.genre.push(genre); }
    /**
     * Setter function.
     * @param single Is the song a single ?, true or false.
     */
    public setSingle(single: boolean): void { this.single = single; }
    /**
     * Setter function.
     * @param numRepo New reproduction number of the song.
     */
    public setNumRepo(numRepo: number): void { this.numRepro = numRepo; }
    /**
     * Adding a number of reproductions.
     * @param newRepro New reproductions to add.
     */
    public addReproductions(newRepro: number): void { this.numRepro += newRepro; }
}