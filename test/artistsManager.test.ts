import { describe, it } from 'mocha';
import { expect } from 'chai';
import ArtistsManager from '../src/artistsManager.class';
import { Artist } from '../src/artist.class';

describe('Artists Manager class tests', () => {
  const systemManager: ArtistsManager = new ArtistsManager();
  const newArtist: Artist = new Artist(
    'Eminem',
    [''],
    ['Rap'],
    ['Recovery'],
    ['Not Afraid', 'Love The Way You Lie'],
    52673522,
  );
  describe('Single artist songs can be sorted and outputed', () => {
    it('Alphabetically asc', () => {
      expect(systemManager.viewArtistSongs(0)).to.be.eql(
        'Bad Bunny songs:\n'
        + 'EL MUNDO ES MÍO\n'
        + 'HOY COBRÉ\n'
        + 'LA NOCHE DE ANOCHE\n'
        + 'MALDITA POBREZA\n'
        + 'TE MUDASTE\n',
      );
    });
    it('Alphabetically desc', () => {
      expect(systemManager.viewArtistSongs(0, true)).to.be.eql(
        'Bad Bunny songs:\n'
        + 'TE MUDASTE\n'
        + 'MALDITA POBREZA\n'
        + 'LA NOCHE DE ANOCHE\n'
        + 'HOY COBRÉ\n'
        + 'EL MUNDO ES MÍO\n',
      );
    });
    it('By views asc', () => {
      expect(systemManager.viewArtistSongsByViews(0)).to.be.eql(
        'Bad Bunny songs:\n'
        + 'EL MUNDO ES MÍO\n'
        + 'MALDITA POBREZA\n'
        + 'HOY COBRÉ\n'
        + 'TE MUDASTE\n'
        + 'LA NOCHE DE ANOCHE\n',
      );
    });
    it('By views desc', () => {
      expect(systemManager.viewArtistSongsByViews(0, true)).to.be.eql(
        'Bad Bunny songs:\n'
        + 'LA NOCHE DE ANOCHE\n'
        + 'TE MUDASTE\n'
        + 'HOY COBRÉ\n'
        + 'MALDITA POBREZA\n'
        + 'EL MUNDO ES MÍO\n',
      );
    });
    it('Only singles', () => {
      expect(systemManager.viewArtistSongsSingles(0)).to.be.eql(
        'Bad Bunny songs:\n',
      );
    });
  });

  describe('Single artist albums can be sorted and outputed', () => {
    it('Alphabetically asc', () => {
      expect(systemManager.viewArtistAlbums(0)).to.be.eql(
        'Bad Bunny albums:\n'
        + 'EL ÚLTIMO TOUR DEL MUNDO\n',
      );
    });
    it('Alphabetically desc', () => {
      expect(systemManager.viewArtistAlbums(0, true)).to.be.eql(
        'Bad Bunny albums:\n'
        + 'EL ÚLTIMO TOUR DEL MUNDO\n',
      );
    });
    it('By release year asc', () => {
      expect(systemManager.viewArtistAlbumsByRelease(0)).to.be.eql(
        'Bad Bunny albums:\n'
        + 'EL ÚLTIMO TOUR DEL MUNDO\n',
      );
    });
    it('By release year desc', () => {
      expect(systemManager.viewArtistAlbumsByRelease(0, true)).to.be.eql(
        'Bad Bunny albums:\n'
        + 'EL ÚLTIMO TOUR DEL MUNDO\n',
      );
    });
  });

  describe('Single artist playlist can be sorted and outputed', () => {
    it('Alphabetically asc', () => {
      expect(systemManager.viewArtistPlaylists(0)).to.be.eql(
        'Bad Bunny playlists:\n'
        + 'Urban Lover\n',
      );
    });
    it('Alphabetically desc', () => {
      expect(systemManager.viewArtistPlaylists(0, true)).to.be.eql(
        'Bad Bunny playlists:\n'
        + 'Urban Lover\n',
      );
    });
  });
  describe('Artists Manager starts with system default artists', () => {
    it('Artits manager can output and list artists', () => {
      expect(systemManager.artists.length).to.be.eql(6);
    });
    it('Artits manager can output and list artists', () => {
      expect(systemManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tLISTENERS\n\n'
        + 'Bad Bunny\t\tTrap Latino\t\t47800001\n'
        + 'RIMON\t\tR&B\t\t398666\n'
        + 'Cruz Cafuné\t\tHip-Hop\t\t778803\n'
        + 'Wax Doctor\t\tDrum n Bass\t\t30153\n'
        + 'Rolando Laserie\t\tJazz Latino\t\t261460\n'
        + 'Daddy Yankee\t\tReggaeton\t\t43090002\n',
      );
    });
  });
  describe('Artist Manager can operate through artists objects', () => {
    it('Manager can create new artist', () => {
      systemManager.createArtist(newArtist);
      expect(systemManager.artists.length).to.be.eql(7);
    });
    it('Manager can not create existing artist', () => {
      systemManager.createArtist(newArtist);
      expect(systemManager.artists.length).to.be.eql(7);
    });
    it('Manager can update an existing artist', () => {
      const updatedArtist: Artist = new Artist(
        'Eminem',
        [''],
        ['Rap'],
        ['Recovery'],
        ['Not Afraid', 'Love The Way You Lie', 'Seduction'],
        52673522,
      );
      systemManager.updateArtist(6, updatedArtist);
      expect(systemManager.artist(6).songs).to.be.eql(['Not Afraid', 'Love The Way You Lie', 'Seduction']);
    });
    it('Manager can save artist in database', () => {
      systemManager.saveArtist(6);
    });
    it('Manager can not delete system artist from database', () => {
      expect(systemManager.deleteArtist(1)).to.be.false;
    });
    it('Manager can delete user artist from database', () => {
      expect(systemManager.deleteArtist(6)).to.be.true;
    });
  });
});
