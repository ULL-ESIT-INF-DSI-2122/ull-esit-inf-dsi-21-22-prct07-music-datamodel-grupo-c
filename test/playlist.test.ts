import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Playlist } from '../src/playlist.class';

const clasicsSpain = new Playlist(
  'Clasicos España',
  ['Princesas', 'Pajaros de Barro', 'Cero', 'Quiero Ser', 'Caminando por la vida', 'Eras Tu', '90 Minutos', 'Son de Amores'],
  28800,
  ['Pop', 'Rock', 'Punk', 'Urban', 'Instrumental']
);

describe('Playlist Class Tests', () => {
  describe('Playlist getters test', () => {
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
      expect(clasicsSpain.minutes).to.be.eql(480);
    });
    it('Playlist genres getter', () => {
      expect(clasicsSpain.genres).to.be.eql(['Pop', 'Rock', 'Punk', 'Urban', 'Instrumental']);
    });
  });
});

