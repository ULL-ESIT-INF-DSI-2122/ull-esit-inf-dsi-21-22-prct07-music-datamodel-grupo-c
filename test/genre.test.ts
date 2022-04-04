import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Genre } from '../src/genre.class';

const rnb = new Genre(
  'Rhythm and blues',
  ['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly'],
  ['Waterfalls', 'My Boo'],
  ['CrazySexyCool', 'Confessions'],
);

describe('Genre Class tests', () => {
  describe('Genre Constructor tests', () => {
    it('Genre Attributes', () => {
      expect(rnb.name).to.be.eql('Rhythm and blues');
      expect(rnb.artists).to.be.eql(['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly']);
      expect(rnb.albums).to.be.eql(['CrazySexyCool', 'Confessions']);
      expect(rnb.songs).to.be.eql(['Waterfalls', 'My Boo']);
    });
  });
  describe('Genre Class getters', () => {
    it('Genre Name Getter', () => {
      expect(rnb.name).to.be.eql('Rhythm and blues');
    });
    it('Genre Producers getter', () => {
      expect(rnb.artists).to.be.eql(['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly']);
    });
    it('Genre albums getter', () => {
      expect(rnb.albums).to.be.eql(['CrazySexyCool', 'Confessions']);
    });
    it('Genre songs getter', () => {
      expect(rnb.songs).to.be.eql(['Waterfalls', 'My Boo']);
    });
  });
  describe('Genre Class setters', () => {
    it('Genre Producers setter', () => {
      rnb.artists = ['Usher', 'TLC', 'Alicia Keys', 'Beyonce', 'R. Kelly'];
    });
    it('Genre albums setter', () => {
      rnb.albums = ['CrazySexyCool', 'Confessions'];
    });
    it('Genre songs setter', () => {
      rnb.songs = ['Waterfalls', 'My Boo'];
    });
  });
  describe('Genre Class add Methods', () => {
    it('addProducers method', () => {
      rnb.addArtist('Whitney Houston');
      expect(rnb.artists.length).to.be.eql(6);
      expect(rnb.artists.at(-1)).to.be.eql('Whitney Houston');
    });
    it('addAlbums method', () => {
      rnb.addAlbum('The diary of Alicia Keys');
      expect(rnb.albums.length).to.be.eql(3);
      expect(rnb.albums.at(-1)).to.be.eql('The diary of Alicia Keys');
    });
    it('addSongs method', () => {
      rnb.addSong('The Boy Is Mine');
      expect(rnb.songs.length).to.be.eql(3);
      expect(rnb.songs.at(-1)).to.be.eql('The Boy Is Mine');
    });
  });
  describe('Genre Class remove Methods', () => {
    it('remove artist method', () => {
      rnb.removeArtist('Whitney Houston');
      expect(rnb.artists.length).to.be.eql(5);
      expect(rnb.artists.at(-1)).to.be.eql('R. Kelly');
      rnb.removeArtistAt(0);
      expect(rnb.artists.length).to.be.eql(4);
      expect(rnb.artists.at(0)).to.be.eql('TLC');
    });
    it('remove albums method', () => {
      rnb.removeAlbum('The diary of Alicia Keys');
      expect(rnb.albums.length).to.be.eql(2);
      expect(rnb.albums.at(-1)).to.be.eql('Confessions');
      rnb.removeAlbumAt(0);
      expect(rnb.albums.length).to.be.eql(1);
      expect(rnb.albums.at(0)).to.be.eql('Confessions');
    });
    it('remove song method', () => {
      rnb.removeSong('The Boy Is Mine');
      expect(rnb.songs.length).to.be.eql(2);
      expect(rnb.songs.at(-1)).to.be.eql('My Boo');
      rnb.removeSongAt(0);
      expect(rnb.songs.length).to.be.eql(1);
      expect(rnb.songs.at(0)).to.be.eql('My Boo');
    });
  });
});
