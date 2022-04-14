import { describe, it } from 'mocha';
import { expect } from 'chai';
import PlaylistManager from '../src/playlitsManager.class';
import Playlist from '../src/playlist.class';
import { Song } from '../src/song.class';

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
    });

    it('Manager can navigate to a single playlist and show by song title, by default asc', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Been Around The Globe');
    });
    it('Manager can navigate to a single playlist and show by song title reversed', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      systemManager.playlist(0).sortBySongName(true);
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Sobre Una Tumba Rumba');
    });
    it('Manager can navigate to a single playlist and show by group/artist', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      systemManager.playlist(0).sortByArtistName();
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Mountain Views');
      systemManager.playlist(0).sortByArtistName(true);
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Cuba Linda');
    });
    it('Manager can navigate to a single playlist and show by release year', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      systemManager.playlist(0).sortByAlbumRelease();
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Cuba Linda');
      systemManager.playlist(0).sortByAlbumRelease(true);
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Mountain Views');
    });
    it('Manager can navigate to a single playlist and show by song duration', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      systemManager.playlist(0).sortBySongDuration();
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('La Primera Piedra');
      systemManager.playlist(0).sortBySongDuration(true);
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Feed Me');
    });
    it('Manager can navigate to a single playlist and show by genre', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      systemManager.playlist(0).sortByGenre();
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Cuba Linda');
      systemManager.playlist(0).sortByGenre(true);
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Mountain Views');
    });
    it('Manager can navigate to a single playlist and show by total views', () => {
      expect(systemManager.playlist(0).name).to.be.eql('RnB/Jazz Latino lover');
      systemManager.playlist(0).sortBySongViews();
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Sobre Una Tumba Rumba');
      systemManager.playlist(0).sortBySongViews(true);
      expect(systemManager.playlist(0).songs[0].name).to.be.eql('Hola Soledad');
    });
  });
  describe('Manager can create playlists from scratch', () => {
    const systemManager: PlaylistManager = new PlaylistManager();
    const existingPlaylist: Playlist = systemManager.playlist();
    const extendedPlaylist: Playlist = new Playlist(
      'RnB/Jazz Latino lover V2',
    );
    systemManager.playlist().songs.forEach((song) => {
      extendedPlaylist.addSong(song);
    });
    const ghosteame: Song = new Song(
      'GHOSTÉAME',
      'Cruz Cafuné',
      183,
      ['Hip-Hop'],
      false,
      2632735,
    );
    const playlistFromScratch: Playlist = new Playlist('My favourite songs');
    it('Playlist cant be created if name already exists', () => {
      systemManager.createPlaylist(existingPlaylist, []);
      expect(systemManager.playlists.length).to.be.eq(3);
      expect(systemManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tDURATION\n\n'
        + 'RnB/Jazz Latino lover\t\tR&B, Jazz Latino\t\t0 hr 35 min 4 sec\n'
        + 'Metal lover\t\tProgressive Metal, Metalcore, Mathcore\t\t0 hr 48 min 17 sec\n'
        + 'Urban Lover\t\tTrap Latino, Hip-Hop\t\t0 hr 29 min 46 sec\n',
      );
    });
    it('Created playlist from other outputs as expected', () => {
      systemManager.createPlaylist(extendedPlaylist, [ghosteame]);
      expect(systemManager.playlists.length).to.be.eq(4);
      expect(systemManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tDURATION\n\n'
        + 'RnB/Jazz Latino lover\t\tR&B, Jazz Latino\t\t0 hr 35 min 4 sec\n'
        + 'Metal lover\t\tProgressive Metal, Metalcore, Mathcore\t\t0 hr 48 min 17 sec\n'
        + 'Urban Lover\t\tTrap Latino, Hip-Hop\t\t0 hr 29 min 46 sec\n'
        + 'RnB/Jazz Latino lover V2\t\tR&B, Jazz Latino, Hip-Hop\t\t0 hr 38 min 7 sec\n',
      );
    });
    it('Created playlist from scratch outputs as expected', () => {
      systemManager.createPlaylist(existingPlaylist, []);
      expect(systemManager.playlists.length).to.be.eq(4);
      expect(systemManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tDURATION\n\n'
        + 'RnB/Jazz Latino lover\t\tR&B, Jazz Latino\t\t0 hr 35 min 4 sec\n'
        + 'Metal lover\t\tProgressive Metal, Metalcore, Mathcore\t\t0 hr 48 min 17 sec\n'
        + 'Urban Lover\t\tTrap Latino, Hip-Hop\t\t0 hr 29 min 46 sec\n'
        + 'RnB/Jazz Latino lover V2\t\tR&B, Jazz Latino, Hip-Hop\t\t0 hr 38 min 7 sec\n',
      );
      systemManager.createPlaylist(playlistFromScratch, []);
      expect(systemManager.playlists.length).to.be.eq(5);
      expect(systemManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tDURATION\n\n'
        + 'RnB/Jazz Latino lover\t\tR&B, Jazz Latino\t\t0 hr 35 min 4 sec\n'
        + 'Metal lover\t\tProgressive Metal, Metalcore, Mathcore\t\t0 hr 48 min 17 sec\n'
        + 'Urban Lover\t\tTrap Latino, Hip-Hop\t\t0 hr 29 min 46 sec\n'
        + 'RnB/Jazz Latino lover V2\t\tR&B, Jazz Latino, Hip-Hop\t\t0 hr 38 min 7 sec\n'
        + 'My favourite songs\t\t\t\t0 hr 0 min 0 sec\n',
      );
    });
  });
  describe('Manager can store and delete playlists', () => {
    const systemManager: PlaylistManager = new PlaylistManager();
    const extendedPlaylist: Playlist = new Playlist(
      'RnB/Jazz Latino lover V2',
    );
    systemManager.playlist().songs.forEach((song) => {
      extendedPlaylist.addSong(song);
    });
    const ghosteame: Song = new Song(
      'GHOSTÉAME',
      'Cruz Cafuné',
      183,
      ['Hip-Hop'],
      false,
      2632735,
    );
    systemManager.createPlaylist(extendedPlaylist, [ghosteame]);
    it('Existing playlist wont show changes in database', () => {
      systemManager.savePlaylist(0);
    });
    it('user playlist can be stored', () => {
      systemManager.savePlaylist(3);
    });
    it('system playlists cant be deleted', () => {
      expect(systemManager.deletePlaylist(0)).to.be.eql(false);
    });
    it('user playlist can be deleted', () => {
      expect(systemManager.deletePlaylist(3)).to.be.eql(true);
    });
  });
});
