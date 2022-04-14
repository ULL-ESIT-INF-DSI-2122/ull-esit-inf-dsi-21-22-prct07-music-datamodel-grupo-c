import { describe, it } from 'mocha';
import { expect } from 'chai';
import SongsManager from '../src/songsManager.class';
import { Song } from '../src/song.class';

describe('Songs Manager class tests', () => {
  const systemManager: SongsManager = new SongsManager();
  const newSong: Song = new Song('Non Stop');
  describe('Manager starts with system default songs', () => {
    it('Manager object builds with 55 system songs', () => {
      expect(systemManager.songs.length).to.be.eq(55);
    });
    console.log(systemManager.preview());
    // it('Manager can output and list songs', () => {
    //   expect(systemManager.preview()).to.be.eql(
    //     'SONG\t\tARTIST\n\n'
    //     + 'Monomyth\t\tAnimals As Leaders\n'
    //     + 'Red Miso\t\tAnimals As Leaders\n'
    //     + 'Gestaltzerfall\t\tAnimals As Leaders\n'
    //     + 'Asahi\t\tAnimals As Leaders\n'
    //     + 'The Problem of Other Minds\t\tAnimals As Leaders\n'
    //     + 'EL MUNDO ES MÍO\t\t\n'
    //     + 'TE MUDASTE\t\tBad Bunny\n'
    //     + 'HOY COBRÉ\t\tBad Bunny\n'
    //     + 'MALDITA POBREZA\t\tBad Bunny\n'
    //     + 'LA NOCHE DE ANOCHE\t\tBad Bunny\n'
    //     + 'Been Around The Globe\t\tRIMON\n'
    //     + 'Feed Me\t\t\n',
    //   );
  });

  describe('Songs Manager can operate through songs objects', () => {
    it('Songs Manager can create new song', () => {
      systemManager.createSong(newSong);
      expect(systemManager.songs.length).to.be.eq(56);
    });
    it('Manager can not create existing song', () => {
      systemManager.createSong(newSong);
      expect(systemManager.songs.length).to.be.eq(56);
    });
    it('Manager can update existing song', () => {
      const updatedGenre: Song = new Song('Nonstop');
      systemManager.updateSong(55, updatedGenre);
      expect(systemManager.song(55).name).to.be.eq('Nonstop');
    });
    it('Manager can save songs in database', () => {
      systemManager.saveSong(55);
    });
    it('Manager can not delete system song from database', () => {
      expect(systemManager.deleteSong(1)).to.be.false;
    });
    it('Manager can delete user song from database', () => {
      expect(systemManager.deleteSong(55)).to.be.true;
    });
  });
});
