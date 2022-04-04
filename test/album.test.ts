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
  describe('Album class add methods', () => {
    it('addGenre method', () => {
      laPromesa.addGenre('Alternative');
      expect(laPromesa.genres.length).to.be.eql(4);
      expect(laPromesa.genres.at(-1)).to.be.eql('Alternative');
    });
    it('addSong method', () => {
      laPromesa.addSong('Bailando');
      expect(laPromesa.songs.length).to.be.eql(5);
      expect(laPromesa.songs.at(-1)).to.be.eql('Bailando');
    });
  });
  describe('Album Constructor tests', () => {
    it('Album Attributes', () => {
      expect(laPromesa.name).to.be.eql('La Promesa');
      expect(laPromesa.artist).to.be.eql('Justin Quiles');
      expect(laPromesa.year).to.be.eql(2017);
      expect(laPromesa.genres).to.be.eql(['Urban', 'Pop', 'Reggaeton', 'Alternative']);
      expect(laPromesa.songs).to.be.eql(['La Amiga', 'Confesion', 'Vacio', 'Instagram', 'Bailando']);
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
      expect(laPromesa.genres).to.be.eql(['Urban', 'Pop', 'Reggaeton', 'Alternative']);
    });
    it('Album songs getter', () => {
      expect(laPromesa.songs).to.be.eql(['La Amiga', 'Confesion', 'Vacio', 'Instagram', 'Bailando']);
    });
  });
  describe('Album class setters', () => {
    it('Album genres setter', () => {
      laPromesa.genres = ['Instrumental', 'Pop', 'Urban'];
      expect(laPromesa.genres).to.be.eql(['Instrumental', 'Pop', 'Urban']);
    });
    it('Album songs setter', () => {
      laPromesa.songs = ['Buscandote', 'Envolver', 'Encendia'];
      expect(laPromesa.songs).to.be.eql(['Buscandote', 'Envolver', 'Encendia']);
    });
  });

});