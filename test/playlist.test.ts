import { expect } from 'chai';
import exp from 'constants';
import { describe, it } from 'mocha';
import { Playlist } from '../src/playlist.class';

const clasicsSpain = new Playlist(
  'Clasicos España',
  ['Princesas', 'Pajaros de Barro', 'Cero', 'Quiero Ser', 'Caminando por la vida', 'Eras Tu', '90 Minutos', 'Son de Amores'],
  28800,
  ['Pop', 'Rock', 'Punk', 'Urban', 'Instrumental']
);

describe('Playlist Class Tests', () => {
  describe('Playlist getters tests', () => {
    it('Playlist name getter', () => {
      expect(clasicsSpain.name).to.be.eql('Clasicos España');
    });
    it('Playlist songs getter', () => {
      expect(clasicsSpain.songs).to.be.eql(['Princesas', 'Pajaros de Barro', 'Cero', 'Quiero Ser', 'Caminando por la vida', 'Eras Tu', '90 Minutos', 'Son de Amores']);
    });
    it('Playlist duration getter', () => {
      expect(clasicsSpain.duration).to.be.eql(28800);
    });
    it('Playlist hours getter', () => {
      expect(clasicsSpain.hours).to.be.eql(8);
    });
    it('Playlist minutes getter', () => {
      expect(clasicsSpain.minutes).to.be.eql(0);
    });
    it('Playlist genres getter', () => {
      expect(clasicsSpain.genres).to.be.eql(['Pop', 'Rock', 'Punk', 'Urban', 'Instrumental']);
    });
  });
  describe('Playlist setters tests', () => {
    it('Playlist songs setter', () => {
      clasicsSpain.songs = ['La Deriva', 'Te entiendo', 'Tanto la Queria', 'Lento'];
      expect(clasicsSpain.songs).to.be.eql(['La Deriva', 'Te entiendo', 'Tanto la Queria', 'Lento']);
    });
    it('Playlist duration setter (testing hours and minutes as well)', () => {
      clasicsSpain.duration = 30000;
      expect(clasicsSpain.duration).to.be.eql(30000);
      expect(clasicsSpain.hours).to.be.eql(8);
      expect(clasicsSpain.minutes).to.be.eql(20);
    });
    it('Playlist genres setter', () => {
      clasicsSpain.genres = ['Flamenco', 'Clasica', 'Salsa'];
      expect(clasicsSpain.genres).to.be.eql(['Flamenco', 'Clasica', 'Salsa']);
    });
  });
  describe('Playlist add methods', () => {
    it('addGenre method test', () => {
      clasicsSpain.addGenre('Punk');
      expect(clasicsSpain.genres).to.be.eql([ 'Flamenco', 'Clasica', 'Salsa', 'Punk' ]);
    });
    it('addSong method test', () => {
      clasicsSpain.addSong('No Dudaria');
      expect(clasicsSpain.songs).to.be.eql(['La Deriva', 'Te entiendo', 'Tanto la Queria', 'Lento', 'No Dudaria']);
    });
  });
  describe('Playlist remove methods', () => {
    it('removeGenre method test', () => {
      clasicsSpain.removeGenre('Punk');
      expect(clasicsSpain.genres).to.be.eql([ 'Flamenco', 'Clasica', 'Salsa']);
    });
    it('removeSong method test', () => {
      clasicsSpain.removeSong('Te entiendo');
      expect(clasicsSpain.songs).to.be.eql(['La Deriva', 'Tanto la Queria', 'Lento', 'No Dudaria']);
    });
  });
});

