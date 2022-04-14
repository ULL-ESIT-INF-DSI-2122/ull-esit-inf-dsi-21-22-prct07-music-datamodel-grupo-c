import { describe, it } from 'mocha';
import { expect } from 'chai';
import AlbumsManager from '../src/albumsManager.class';
import { Album } from '../src/album.class';
import { Song } from '../src/song.class';

describe('Album Manager class tests', () => {
  const systemManager: AlbumsManager = new AlbumsManager();
  const outThere: Song = new Song(
    'Out There',
    'Luke Combs',
    456,
    ['Country'],
    false,
    123456,
  );
  const lonelyOne: Song = new Song(
    'Lonely One',
    'Luke Combs',
    123,
    ['Country'],
    false,
    987456,
  );
  const newAlbum = new Album(
    'This One\'s for You',
    'Luke Combs',
    2017,
    ['Country'],
    [outThere, lonelyOne],
  );

  describe('Manager starts with system default albums', () => {
    it('Manager object builds with 3 system playlists', () => {
      expect(systemManager.albums.length).to.be.eql(15);
    });
    it('Manager can output and list albums', () => {
      expect(systemManager.preview()).to.be.eql(
        'ALBUMS\n\n'
        + 'Parrhesia\n'
        + 'EL ÚLTIMO TOUR DEL MUNDO\n'
        + 'Digital Tears\n'
        + 'All Hail\n'
        + 'VISIÓN TÚNEL\n'
        + 'Selected Works 94-96\n'
        + 'Favourite Worst Nightmare\n'
        + 'Crisis Of Faith\n'
        + 'Todo el Tiempo...\n'
        + 'Dissociation\n'
        + 'Adictiva\n'
        + 'MÉTELE AL PERREO\n'
        + 'Sal y Perrea (Remix)\n'
        + 'EL PONY\n'
        + 'Don Don (Remix)\n',
      );
    });
  });
  describe('Manager can operate through albums objects', () => {
    it('Manager can create new album', () => {
      systemManager.createAlbum(newAlbum);
      expect(systemManager.albums.length).to.be.eq(16);
    });
    it('Manager cant create existing album', () => {
      systemManager.createAlbum(newAlbum);
      expect(systemManager.albums.length).to.be.eq(16);
    });
    it('Manager can update existing album', () => {
      const updatedAlbum: Album = new Album(
        'What you see is what you get',
        'Luke Combs',
        2017,
        ['Country'],
        [outThere],
      );
      systemManager.updateAlbum(16, updatedAlbum);
      expect(systemManager.album(16).name).to.be.eq('What you see is what you get');
    });
    it('Manager can save album in database', () => {
      systemManager.saveAlbum(16);
    });
    it('Manager cant delete system Album from database', () => {
      expect(systemManager.deleteAlbum(1)).to.be.false;
    });
    it('Manager can delete user Album from database', () => {
      expect(systemManager.deleteAlbum(16)).to.be.true;
    });
  });
});
