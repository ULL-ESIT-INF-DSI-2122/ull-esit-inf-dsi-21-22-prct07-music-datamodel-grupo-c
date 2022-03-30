import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Artist } from '../src/artist';

const groups: string[] = ['Animals As Leaders'];
const genres: string[] = ['Progressive Metal', 'Instrumental'];
const albums: string[] = ['Parrhesia'];
const songs: string[] = ['Conflict Cartography', 'Monomyth', 'Red Miso', 'Gestaltzerfall', 'Asahi', 'The Problem of Other Minds', 'Thoughts and Prayers', 'Micro-Aggressions', 'Gordian Naught'];

const tosinAbasi: Artist = new Artist('Tosin Abasi', groups, genres, albums, songs);

describe('Artist Class tests', () => {
  describe('Artist Class getters', () => {
    it('Artist Name Getter', () => {
      expect(tosinAbasi.getName()).to.be.eql('Tosin Abasi');
    });
    it('Artist Groups getter', () => {
      expect(tosinAbasi.getGroups()).to.be.eql(['Animals As Leaders']);
    });
    it('Artist Genres getter', () => {
      expect(tosinAbasi.getGenres()).to.be.eql(['Progressive Metal', 'Instrumental']);
    });
    it('Artist Albums getter', () => {
      expect(tosinAbasi.getAlbums()).to.be.eql(['Parrhesia']);
    });
    it('Artist Songs getter', () => {
      expect(tosinAbasi.getSongs()).to.be.eql(['Conflict Cartography', 'Monomyth', 'Red Miso', 'Gestaltzerfall', 'Asahi', 'The Problem of Other Minds', 'Thoughts and Prayers', 'Micro-Aggressions', 'Gordian Naught']);
    });
    it('Artist Listeners getter', () => {
      expect(tosinAbasi.getListeners()).to.be.equal(0);
    });
  });
});