import { describe, it } from 'mocha';
import { expect } from 'chai';
import ArtistsManager from '../src/ArtistsManager.class';

describe('Artists Manager class tests', () => {
  describe('Artists Manager starts with system default artists', () => {
    const artistManager: ArtistsManager = new ArtistsManager();
    it('Artits manager can output and list artists', () => {
      expect(artistManager.artists.length).to.be.eql(6);
    });
    it('Artits manager can output and list artists', () => {
      expect(artistManager.preview()).to.be.eql(
        'NAME\t\tGENRES\t\tLISTENERS\n\n'
        + 'Bad Bunny\t\tTrap Latino\t\t47800001\n'
        + 'RIMON\t\tR&B\t\t398666\n'
        + 'Cruz Cafuné\t\tHip-Hop\t\t778803\n'
        + 'Max Doctor\t\tDrum n Bass\t\t30153\n'
        + 'Rolando Laserie\t\tJazz Latino\t\t261460\n'
        + 'Daddy Yankee\t\tReggaeton\t\t43090002\n',
      );
    });
  });
});
