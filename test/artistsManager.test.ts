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
  });
});
