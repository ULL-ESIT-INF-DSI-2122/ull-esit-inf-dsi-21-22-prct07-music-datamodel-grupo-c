import { describe, it } from 'mocha';
import { expect } from 'chai';
import GenresManager from '../src/genresManager.class';
import { Genre } from '../src/genre.class';

describe('Genres Manager class tests', () => {
  const systemManager: GenresManager = new GenresManager();
  const newGenre: Genre = new Genre('Lo-Fi');
  describe('Manager starts with system default genres', () => {
    it('Manager object builds with 3 system playlists', () => {
      expect(systemManager.genres.length).to.be.eq(11);
    });
    it('Manager can output and list genres', () => {
      expect(systemManager.preview()).to.be.eql(
        'GENRES\n\n'
        + 'Progressive Metal\n'
        + 'Trap Latino\n'
        + 'R&B\n'
        + 'Metalcore\n'
        + 'Hip-Hop\n'
        + 'Drum n Bass\n'
        + 'Indie\n'
        + 'Punk Rock\n'
        + 'Jazz Latino\n'
        + 'Mathcore\n'
        + 'Reggaeton\n',
      );
    });
  });
  describe('Manager can operate through genres objects', () => {
    it('Manager can create new genre', () => {
      systemManager.createGenre(newGenre);
      expect(systemManager.genres.length).to.be.eq(12);
    });
    it('Manager cant create existing genre', () => {
      systemManager.createGenre(newGenre);
      expect(systemManager.genres.length).to.be.eq(12);
    });
    it('Manager can update existing genre', () => {
      const updatedGenre: Genre = new Genre('LO-FI');
      systemManager.updateGenre(11, updatedGenre);
      expect(systemManager.genre(11).name).to.be.eq('LO-FI');
    });
    it('Manager can save genre in database', () => {
      systemManager.saveGenre(11);
    });
    it('Manager cant delete system genre from database', () => {
      expect(systemManager.deleteGenre(1)).to.be.false;
    });
    it('Manager can delete user genre from database', () => {
      expect(systemManager.deleteGenre(11)).to.be.true;
    });
  });
});
