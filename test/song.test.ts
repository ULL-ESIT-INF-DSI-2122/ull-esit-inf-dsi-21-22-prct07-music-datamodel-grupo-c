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
const strobe = new Song('Strobe');

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
  describe('Song Class setters', () => {
    it('Song Artist setter', () => {
      strobe.artist = 'Deadmau5';
      expect(strobe.artist).to.be.eql('Deadmau5');
    });
    it('Song Seconds setter', () => {
      strobe.seconds = 254;
      expect(strobe.seconds).to.be.eql(254);
    });
    it('Song Genres setter', () => {
      strobe.genres = ['EDM', 'Progressive House', 'Ambient'];
      expect(strobe.genres).to.be.eql(['EDM', 'Progressive House', 'Ambient']);
    });
    it('Song Single setter', () => {
      strobe.single = true;
      expect(strobe.single).to.be.eql(true);
    });
    it('Song Views setter', () => {
      strobe.views = 59900000;
      expect(strobe.views).to.be.eql(59900000);
    });
  });
  describe('Song Class add Methods', () => {
    it('addGenre method', () => {
      strobe.addGenre('Phonk');
      expect(strobe.genres.length).to.be.eql(4);
      expect(strobe.genres).to.be.eql(['EDM', 'Progressive House', 'Ambient', 'Phonk']);
    });
  });
  describe('Song CLass remove Methods', () => {
    it('removeGenre method', () => {
      strobe.removeGenre('Phonk');
      expect(strobe.genres.length).to.be.eql(3);
      expect(strobe.genres).to.be.eql(['EDM', 'Progressive House', 'Ambient']);
    });
  });
});
