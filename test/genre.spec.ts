import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Genre } from '../src/genre';

const rnb = new Genre('Rhythm and blues', ['Usher', 'TLC', 'Alicia Keys', 'Beyoncé', 'R. Kelly'], ['Waterfalls', 'My Boo']);

describe('Genre Class tests', () => {
  describe('Genre Constructor tests', () => {
    it('Genre Attributes', () => {
      expect(rnb.name).to.be.eql('Rythm and blues');
    });
  });
  describe('Genre Class getters', () => {
    
  });
  describe('Genre Class setters', () => {

  });
});