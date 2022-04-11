import { expect } from 'chai';
import { describe, it } from 'mocha';
import Playlist from '../src/playlist.class';
import { Song } from '../src/song.class';
import { Album } from '../src/album.class';

const goldAgeHipHop = new Playlist('Golden Age Hip Hop');

const albumIntro: Song = new Song(
  'Album Intro',
  'Nas',
  (2 * 60) + 24,
  ['hip-hop'],
);

const streetDreams: Song = new Song(
  'Street Dreams',
  'Nas',
  (4 * 60) + 39,
  ['hip-hop'],
);

const gaveYouPower: Song = new Song(
  'I Gave You Power',
  'Nas',
  (3 * 60) + 52,
  ['hip-hop'],
);

const watch: Song = new Song(
  'Watch Them Niggas',
  'Nas',
  (4 * 60) + 4,
  ['hip-hop'],
);

const takeItInBlood: Song = new Song(
  'Take It In Blood',
  'Nas',
  (4 * 60) + 48,
  ['hip-hop'],
);

const nasIsComing: Song = new Song(
  'Nas Is Coming (feat Dr.Dre)',
  'Nas',
  (5 * 60) + 41,
  ['hip-hop'],
);

const affirmative: Song = new Song(
  'Affirmative Action (feat AZ, Cormega & Foxy Brown)',
  'Nas',
  (4 * 60) + 19,
  ['hip-hop'],
);

const theSetUp: Song = new Song(
  'The Set Up (feat Havoc)',
  'Nas',
  (4 * 60) + 1,
  ['hip-hop'],
);

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
      expect(goldAgeHipHop.groups).to.be.eql([]);
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
        goldAgeHipHop.removeSong('The Message');
      });
    });
    describe('Playlist add and remove album methods', () => {
      const itWasWritten: Album = new Album(
        'It Was Written',
        'Nas',
        1996,
        ['RAP', 'hip-hop'],
        [
          albumIntro,
          streetDreams,
          gaveYouPower,
          watch,
          takeItInBlood,
          nasIsComing,
          affirmative,
          theSetUp,
        ],
      );
      it('addAlbum method test', () => {
        goldAgeHipHop.addAlbum(itWasWritten);
        expect(goldAgeHipHop.length).to.be.eq(8);
        expect(goldAgeHipHop.artists).to.be.eql(['Nas']);
        expect(goldAgeHipHop.allAlbumNames).to.be.eql(['It Was Written']);
      });
      it('removeAlbum method test', () => {
        goldAgeHipHop.removeAlbum('It Was Written');
        expect(goldAgeHipHop.length).to.be.eq(0);
        expect(goldAgeHipHop.artists).to.be.eql([]);
        expect(goldAgeHipHop.allAlbumNames).to.be.eql([]);
      });

      it('removeAlbum method test with other non album songs', () => {
        goldAgeHipHop.addAlbum(itWasWritten);
        goldAgeHipHop.addSong(shoutouts);
        goldAgeHipHop.addSong(theMessage);
        expect(goldAgeHipHop.length).to.be.eq(10);
        goldAgeHipHop.removeAlbum('It Was Written');
        expect(goldAgeHipHop.length).to.be.eq(2);
        expect(goldAgeHipHop.artists).to.be.eql(['Nas']);
        expect(goldAgeHipHop.allAlbumNames).to.be.eql([]);
      });
    });
  });
  describe('Playlist searching tests', () => {
  });
  describe('Playlist sorting tests', () => {
  });
  describe('Playlist can be turned into string', () => {
    it('Playlist with two songs', () => {
      expect(goldAgeHipHop.toString()).to.be.eql(
        'GOLDEN AGE HIP HOP\n'
        + '\t(hip-hop, RAP, urban)\n'
        + '2 songs | 0 hr 7 min 40 sec\n\n'
        + '#\tTitle\t\t\tAlbum\t\tDuration\n'
        + '1\tShoutouts\t\tno album\t3:46\n'
        + ' \tNas\n'
        + '2\tThe Message\t\tno album\t3:54\n'
        + ' \tNas\n'
        + '\n',
      );
    });
  });
});
