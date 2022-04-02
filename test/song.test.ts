import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Song } from '../src/song.class';

const cuentaConmigo = new Song(
  'Cuenta Conmigo',
  'Cruz Cafune',
  188,
  ['Rap', 'Hip-Hop', 'Urban'],
  false,
  2800000,
);

describe('Song Class tests', () => {
  describe('Song Constructor tests', () => {
    it('Song Attributes', () => {
    });
  });
  describe('Song Class getters', () => {
    it('Song Name Getter', () => {
      expect(cuentaConmigo.name).to.be.eql('Cuenta Conmigo');
    });
    it('Song Artist getters', () => {
      expect(cuentaConmigo.artist).to.be.eql('Cruz Cafune');
    });
    it('Song Seconds Getter', () => {
      expect(cuentaConmigo.seconds).to.be.eql(188);
    });
    it('Song Genres getters', () => {
      expect(cuentaConmigo.genres).to.be.eql(['Rap', 'Hip-Hop', 'Urban']);
    });
    it('Song Seconds Getter', () => {
      expect(cuentaConmigo.single).to.be.eql(false);
    });
    it('Song Genres getters', () => {
      expect(cuentaConmigo.views).to.be.eql(2800000);
    });
  });
});
