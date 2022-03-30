import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Artist } from '../src/artist';

const groups: string[] = ['Animals As Leaders'];
const genres: string[] = ['Progressive Metal', 'Instrumental'];
const albums: string[] = ['Parrhesia', 'The Madness Of Many'];
const songs: string[] = ['Gestaltzerfall', 'The Brain Dance'];

const tosinAbasi: Artist = new Artist('Tosin Abasi', ['animals as leaders'], ['Progressive Metal'], ['Parrhesia'], ['Gestaltzerfall']);

describe('Artist Class tests', () => {
  describe('Artist Class getters', () => {
    it('Artist Name Getter', () => {
      expect(tosinAbasi.getName()).to.be.eql('Tosin Abasi');
    });
    it('Artist Groups getter', () => {
      expect(tosinAbasi.getGroups()).to.be.eql(['animals as leaders']);
    });
    it('Artist Genres getter', () => {
      expect(tosinAbasi.getGenres()).to.be.eql(['Progressive Metal']);
    });
    it('Artist Albums getter', () => {
      expect(tosinAbasi.getAlbums()).to.be.eql(['Parrhesia']);
    });
    it('Artist Songs getter', () => {
      expect(tosinAbasi.getSongs()).to.be.eql(['Gestaltzerfall']);
    });
    it('Artist Listeners getter', () => {
      expect(tosinAbasi.getListeners()).to.be.equal(0);
    });
  });
  describe('Artist Class setters', () => {
    it('Artist Name Setter', () => {
      tosinAbasi.setName('Oluwatosin Ayoyinka Olumide Abasi');
      expect(tosinAbasi.getName()).to.be.equal('Oluwatosin Ayoyinka Olumide Abasi');
    });
    it('Artist Groups setter', () => {
      tosinAbasi.setGroups(groups);
      expect(tosinAbasi.getGroups()).to.be.eql(['Animals As Leaders']);
    });
    it('Artist Genres setter', () => {
      tosinAbasi.setGenres(genres);
      expect(tosinAbasi.getGenres()).to.be.eql(['Progressive Metal', 'Instrumental']);
    });
    it('Artist Albums setter', () => {
      tosinAbasi.setAlbums(albums);
      expect(tosinAbasi.getAlbums()).to.be.eql(['Parrhesia', 'The Madness Of Many']);
    });
    it('Artist Songs setter', () => {
      tosinAbasi.setSongs(songs);
      expect(tosinAbasi.getSongs()).to.be.eql(['Gestaltzerfall', 'The Brain Dance']);
    });
    it('Artist Listeners setter', () => {
      tosinAbasi.setListeners(379947);
      expect(tosinAbasi.getListeners()).to.be.equal(379947);
    });
  });
});