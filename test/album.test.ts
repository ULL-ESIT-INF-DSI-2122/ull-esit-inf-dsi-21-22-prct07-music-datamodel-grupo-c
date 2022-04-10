import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Album } from '../src/album.class';
import { Song } from '../src/song.class';

const laAmiga: Song = new Song(
  'La Amiga',
  'Justin Quiles',
  3 * 60 + 27,
  ['urban'],
);

const confusion: Song = new Song(
  'Confusión',
  'Justin Quiles',
  3 * 60 + 35,
  ['urban'],
);
const vacio: Song = new Song(
  'Vacío',
  'Justin Quiles',
  3 * 60,
  ['urban'],
);
const instagram: Song = new Song(
  'Instagram',
  'Justin Quiles',
  3 * 60,
  ['urban'],
);

const adicto: Song = new Song(
  'Adicto',
  'Justin Quiles',
  3 * 60 + 41,
  ['urban'],
);

const laPromesa = new Album(
  'La Promesa',
  'Justin Quiles',
  2017,
  ['Urban', 'Pop', 'Reggaeton'],
  [laAmiga, instagram, confusion, vacio],
);

describe('Album class tests', () => {
  describe('Album class add methods', () => {
    it('addGenre method', () => {
      laPromesa.addGenre('Alternative');
      expect(laPromesa.genres.length).to.be.eql(4);
      expect(laPromesa.genres.at(-1)).to.be.eql('Alternative');
    });
    it('addSong method', () => {
      laPromesa.addSong(adicto);
      expect(laPromesa.songs.length).to.be.eql(5);
      expect(laPromesa.songs.at(-1)).to.be.eql(adicto);
    });
  });
  describe('Album Constructor tests', () => {
    it('Album Attributes', () => {
      expect(laPromesa.name).to.be.eql('La Promesa');
      expect(laPromesa.artist).to.be.eql('Justin Quiles');
      expect(laPromesa.year).to.be.eql(2017);
      expect(laPromesa.genres).to.be.eql(['Urban', 'Pop', 'Reggaeton', 'Alternative']);
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
      expect(laPromesa.songListNames).to.be.eql(['La Amiga', 'Instagram', 'Confusión', 'Vacío', 'Adicto']);
    });
  });
  describe('Album class setters', () => {
    it('Album genres setter', () => {
      laPromesa.genres = ['Instrumental', 'Pop', 'Urban'];
      expect(laPromesa.genres).to.be.eql(['Instrumental', 'Pop', 'Urban']);
    });
  });
  describe('Album remove methods', () => {
    it('removeGenre method', () => {
      laPromesa.removeGenre('Instrumental');
      expect(laPromesa.genres.length).to.be.eql(2);
      expect(laPromesa.genres).to.be.eql(['Pop', 'Urban']);
    });
    it('removeSong method', () => {
      laPromesa.removeSong('Adicto');
      expect(laPromesa.songs.length).to.be.eql(4);
      expect(laPromesa.songListNames)
        .to.be.eql(['La Amiga', 'Instagram', 'Confusión', 'Vacío']);
    });
  });
});
