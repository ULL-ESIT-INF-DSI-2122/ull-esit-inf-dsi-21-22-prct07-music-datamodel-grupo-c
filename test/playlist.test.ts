import { expect } from 'chai';
import { describe, it } from 'mocha';
import Playlist from '../src/playlist.class';
import { Song } from '../src/song.class';

const goldAgeHipHop = new Playlist('Golden Age Hip Hop');

// ['Princesas', 'Pajaros de Barro', 'Cero', 'Quiero Ser', 'Caminando por la vida', 'Eras Tu',
// '90 Minutos', 'Son de Amores'],
//   28800,
//   ['Pop', 'Rock', 'Punk', 'Urban', 'Instrumental']
const shoutouts: Song = new Song(
  'Shoutouts',
  'Nas',
  (3 * 60) + 46,
  ['hip-hop', 'RAP', 'urban'],
);
const theMessage: Song = new Song(
  'The Message',
  'Nas',
  (3 * 60) + 54,
  ['hip-hop', 'RAP', 'urban'],
);
describe('Gold Age HipHop playlist test', () => {
  describe('Class build tests | props, getters and setters established', () => {
    it('Playlist name getter', () => {
      expect(goldAgeHipHop.name).to.be.eql('Golden Age Hip Hop');
    });
    it('Playlist songs getter', () => {
      expect(goldAgeHipHop.songs).to.be.eql([]);
    });
    it('Playlist albums getter', () => {
      expect(goldAgeHipHop.albums).to.be.eql([]);
    });
    it('Playlist duration getter', () => {
      expect(goldAgeHipHop.duration).to.be.eql({ h: 0, m: 0, s: 0 });
    });
    it('Playlist songs names can be accessed directly', () => {
      expect(goldAgeHipHop.allSongsNames).to.be.eql([]);
    });
    it('Playlist group names can be accessed directly', () => {
      expect(goldAgeHipHop.allGroupNames).to.be.eql([]);
    });
    it('Playlist album names can be accessed directly', () => {
      expect(goldAgeHipHop.allAlbumNames).to.be.eql([]);
    });
    it('Playlist hours getter', () => {
      expect(goldAgeHipHop.hours).to.be.eql(0);
    });
    it('Playlist minutes getter', () => {
      expect(goldAgeHipHop.minutes).to.be.eql(0);
    });
    it('Playlist seconds getter', () => {
      expect(goldAgeHipHop.seconds).to.be.eql(0);
    });
    it('Playlist duration to string', () => {
      expect(goldAgeHipHop.durationString).to.be.eql('0 hr 0 min 0 sec');
    });
    it('Playlist genres getter', () => {
      expect(goldAgeHipHop.genres).to.be.eql([]);
    });
  });
  describe('Playlist manipulation tests', () => {
    describe('Playlist add and remove song methods', () => {

      it('addSong method test', () => {
        goldAgeHipHop.addSong(shoutouts);
        goldAgeHipHop.addSong(theMessage);
        expect(goldAgeHipHop.length).to.be.eql(2);
        expect(goldAgeHipHop.songs).to.be.eql([shoutouts, theMessage]);
        expect(goldAgeHipHop.allSongsNames).to.be.eql(['Shoutouts', 'The Message']);
        expect(goldAgeHipHop.artists).to.be.eql(['Nas']);
        expect(goldAgeHipHop.genres).to.be.eql(['hip-hop', 'RAP', 'urban']);
        expect(goldAgeHipHop.duration).to.be.eql({ h: 0, m: 7, s: 40 });
        expect(goldAgeHipHop.durationString).to.be.eql('0 hr 7 min 40 sec');
      });
      it('removeSong method test', () => {
        goldAgeHipHop.removeSong('Shoutouts');
        expect(goldAgeHipHop.length).to.be.eql(1);
        expect(goldAgeHipHop.songs).to.be.eql([theMessage]);
        expect(goldAgeHipHop.allSongsNames).to.be.eql(['The Message']);
        expect(goldAgeHipHop.artists).to.be.eql(['Nas']);
        expect(goldAgeHipHop.genres).to.be.eql(['hip-hop', 'RAP', 'urban']);
      });
    });
    describe('Playlist remove methods', () => {
    });
  });
  describe('Playlist can be turned into string', () => {
    it('Playlist with two songs', () => {
      goldAgeHipHop.addSong(shoutouts);
      goldAgeHipHop.addSong(theMessage);
      expect(goldAgeHipHop.toString()).to.be.eql(
        'GOLDEN AGE HIP HOP\n'
        + '\t(hip-hop, RAP, urban)\n'
        + '2 songs | 0 hr 7 min 40 sec\n\n'
        + '#\tTitle\t\t\tAlbum\t\tDuration\n'
        + '1\tThe Message\t\tno album\t3:54\n'
        + ' \tNas\n'
        + '2\tShoutouts\t\tno album\t3:46\n'
        + ' \tNas\n'
        + '\n',
      );
      console.log(goldAgeHipHop.toString());
    });
  });
});
