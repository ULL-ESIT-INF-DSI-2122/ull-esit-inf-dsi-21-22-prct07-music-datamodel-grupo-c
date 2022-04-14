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
  });
});
