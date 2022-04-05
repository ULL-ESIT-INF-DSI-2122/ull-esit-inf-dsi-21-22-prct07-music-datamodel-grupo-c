import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Artist } from '../src/artist.class';

const groups: string[] = ['Animals As Leaders'];
const genres: string[] = ['Progressive Metal', 'Instrumental'];
const albums: string[] = ['Parrhesia', 'The Madness Of Many'];
const songs: string[] = ['Gestaltzerfall', 'The Brain Dance'];

const tosinAbasi: Artist = new Artist('Tosin Abasi', ['animals as leaders'], ['Progressive Metal'], ['Parrhesia'], ['Gestaltzerfall'], 0);

describe('Artist Class tests', () => {
  describe('Artist Class getters', () => {
    it('Artist Name Getter', () => {
      expect(tosinAbasi.name).to.be.eql('Tosin Abasi');
    });
    it('Artist Groups getter', () => {
      expect(tosinAbasi.groups).to.be.eql(['animals as leaders']);
    });
    it('Artist Genres getter', () => {
      expect(tosinAbasi.genres).to.be.eql(['Progressive Metal']);
    });
    it('Artist Albums getter', () => {
      expect(tosinAbasi.albums).to.be.eql(['Parrhesia']);
    });
    it('Artist Songs getter', () => {
      expect(tosinAbasi.songs).to.be.eql(['Gestaltzerfall']);
    });
    it('Artist Listeners getter', () => {
      expect(tosinAbasi.listeners).to.be.equal(0);
    });
  });
  describe('Artist Class setters', () => {
    it('Artist Groups setter', () => {
      tosinAbasi.groups = groups;
      expect(tosinAbasi.groups).to.be.eql(['Animals As Leaders']);
    });
    it('Artist Genres setter', () => {
      tosinAbasi.genres = genres;
      expect(tosinAbasi.genres).to.be.eql(['Progressive Metal', 'Instrumental']);
    });
    it('Artist Albums setter', () => {
      tosinAbasi.albums = albums;
      expect(tosinAbasi.albums).to.be.eql(['Parrhesia', 'The Madness Of Many']);
    });
    it('Artist Songs setter', () => {
      tosinAbasi.songs = songs;
      expect(tosinAbasi.songs).to.be.eql(['Gestaltzerfall', 'The Brain Dance']);
    });
    it('Artist Listeners setter', () => {
      tosinAbasi.listeners = 379947;
      expect(tosinAbasi.listeners).to.be.equal(379947);
    });
  });
  describe('Genre Class add Methods', () => {
    it('addListeners method', () => {
      tosinAbasi.addListeners(8497755);
      expect(tosinAbasi.listeners).to.be.equal(8877702);
    });
  });
});
