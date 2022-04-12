import { describe, it } from 'mocha';
import PlaylistManager from '../src/manager.class';
import { expect } from 'chai';
// import { expect } from 'chai';

describe('Manager class tests', () => {
  describe('Manager starts with system default playlists', () => {
    const systemManager: PlaylistManager = new PlaylistManager();
    it('Manager object builds with 3 system playlists', () => {
      expect(systemManager.playlists.length).to.be.eq(3);
    });
    it('Manager can output and list playlists', () => {
      expect(systemManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tDURATION\n\n'
        + 'RnB/Jazz Latino lover\t\tR&B, Jazz Latino\t\t0 hr 35 min 4 sec\n'
        + 'Metal lover\t\tProgressive Metal, Metalcore, Mathcore\t\t0 hr 48 min 17 sec\n'
        + 'Urban Lover\t\tTrap Latino, Hip-Hop\t\t0 hr 29 min 46 sec\n',
      );
      console.log(systemManager.preview());
      console.log(systemManager.playlists[0].toString());
      console.log(systemManager.playlists[1].toString());
      console.log(systemManager.playlists[2].toString());
    });
    it('Manager can navigate to a single playlist and show by song title', () => {
    });
    it('Manager can navigate to a single playlist and show by group/artist', () => {
    });
    it('Manager can navigate to a single playlist and show by release year', () => {
    });
    it('Manager can navigate to a single playlist and show by song duration', () => {
    });
    it('Manager can navigate to a single playlist and show by genre', () => {
    });
    it('Manager can navigate to a single playlist and show by total views', () => {
    });
  });
  describe('Manager can create playlists from scratch', () => {
    it('Playlist cant be created if name already exists', () => {});
    it('Created playlist from scratch outputs as expected', () => {});
    it('Created playlist allow adding songs', () => {});
    it('Created playlist allow removing songs', () => {});
  });
  describe('Manager can create playlists by an existing one', () => {
    it('Playlist cant be created if name already exists', () => {});
    it('Created playlist from scratch outputs as expected', () => {});
    it('Created playlist allow adding songs', () => {});
    it('Created playlist allow removing songs', () => {});
  });
  describe('Manager can store and delete playlists', () => {
    it('system playlists cant be deleted', () => {});
    it('user playlist can be stored', () => {});
    it('user playlist can be deleted', () => {});
  });
});
