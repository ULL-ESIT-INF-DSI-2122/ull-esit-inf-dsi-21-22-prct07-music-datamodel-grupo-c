import { expect } from 'chai';
import exp from 'constants';
import { describe, it } from 'mocha';
import { isDataView } from 'util/types';
import { Album } from '../src/album.class';

const laPromesa = new Album(
  'La Promesa',
  'Justin Quiles',
  2017,
  ['Urban', 'Pop', 'Reggaeton'],
  ['La Amiga', 'Confesion', 'Vacio', 'Instagram'],
);
describe('Album class tests', () => {
  describe('Album Constructor tests', () => {
    it('Album Attributes', () => {
      expect(laPromesa.name).to.be.eql('La Promesa');
      expect(laPromesa.artist).to.be.eql('Justin Quiles');
      expect(laPromesa.year).to.be.eql(2017);
      expect(laPromesa.genres).to.be.eql(['Urban', 'Pop', 'Reggaeton']);
      expect(laPromesa.songs).to.be.eql(['La Amiga', 'Confesion', 'Vacio', 'Instagram']);
    });
  });
  describe('Album class getters', () => {
    it('Album name getter', () => {
      expect(laPromesa.name).to.be.eql('La Promesa');
    });
    it('Album artist getter', () => {
      expect(laPromesa.artist).to.be.eql('Justin Quiles');
    });
    it('Album year getter', () => {
      expect(laPromesa.year).to.be.eql(2017);
    });
    it('Album genres getter', () => {
      expect(laPromesa.genres).to.be.eql(['Urban', 'Pop', 'Reggaeton']);
    });
    it('Album songs getter', () => {
      expect(laPromesa.songs).to.be.eql(['La Amiga', 'Confesion', 'Vacio', 'Instagram']);
    });
  });
});