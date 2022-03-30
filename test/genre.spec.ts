import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Genre } from '../src/genre';

const rnb = new Genre('Rhythm and blues', ['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly'], ['CrazySexyCool', 'Confessions'], ['Waterfalls', 'My Boo']);
const producers: string[] = ['Usher', 'TLC', 'Alicia Keys'];
const albums: string[] = ['Confessions'];
const songs: string[] = ['My Boo'];

describe('Genre Class tests', () => {
  describe('Genre Constructor tests', () => {
    it('Genre Attributes', () => {
      expect(rnb.name).to.be.eql('Rythm and blues');
      expect(rnb.producers).to.be.eql(['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly']);
      expect(rnb.albums).to.be.eql(['CrazySexyCool', 'Confessions']);
      expect(rnb.songs).to.be.eql(['Waterfalls', 'My Boo']);
    });
  });
  describe('Genre Class getters', () => {
    it('Genre Name Getter', () => {
      expect(rnb.getName()).to.be.eql('Rythm and blues');
    });
    it('Genre Producers getter', () => {
      expect(rnb.getProducers()).to.be.eql(['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly']);
    });
    it('Genre albums getter', () => {
      expect(rnb.getAlbums()).to.be.eql(['CrazySexyCool', 'Confessions']);
    });
    it('Genre songs getter', () => {
      expect(rnb.getsongs()).to.be.eql(['Waterfalls', 'My Boo']);
    });
  });
  describe('Genre Class setters', () => {
    it('Genre Name Setter', () => {
      rnb.setName('R&B');
      expect(rnb.getName()).to.be.eql('R&B');
    });
    it('Genre Producers setter', () => {
      rnb.setProducers(producers);
      expect(rnb.getProducers()).to.be.eql(['Usher', 'TLC', 'Alicia Keys']);
    });
    it('Genre albums setter', () => {
      rnb.setAlbums(albums);
      expect(rnb.getAlbums()).to.be.eql(['Confessions']);
    });
    it('Genre songs setter', () => {
      rnb.setSongs(songs);
      expect(rnb.getsongs()).to.be.eql(['My Boo']);
    });
  });
  describe('Genre Class add Methods', () => {
    it('addProducers method', () => {
      rnb.addProducers('Whitney Houston');
      expect(rnb.getProducers()).to.be.eql(['Usher', 'TLC', 'Alicia Keys', 'Whitney Houston']);
    });
    it('addAlbums method', () => {
      rnb.setAlbums('The diary of Alicia Keys');
      expect(rnb.getAlbums()).to.be.eql(['Confessions', 'The diary of Alicia Keys']);
    });
    it('addSongs method', () => {
      rnb.setSongs('The Boy Is Mine');
      expect(rnb.getsongs()).to.be.eql(['My Boo', 'The Boy Is Mine']);
    });
  });
});
