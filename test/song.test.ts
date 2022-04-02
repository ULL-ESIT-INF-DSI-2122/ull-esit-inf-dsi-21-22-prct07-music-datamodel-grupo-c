import Sinon from 'sinon';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Song } from '../src/song.class';

Sinon.stub(console, 'log');

const cuentaConmigo = new Song(
  'Cuenta Conmigo',
  'Cruz Cafune',
  188,
  ['Rap', 'Hip-Hop', 'Urban'],
  false,
  2800000,
);

describe('Song Class tests', () => {
  describe('Song Constructor tests', () => {
    it('Song Attributes', () => {
      expect(cuentaConmigo.name).to.be.eql('Cuenta Conmigo');
      expect(cuentaConmigo.artist).to.be.eql('Cruz Cafune');
      expect(cuentaConmigo.seconds).to.be.eql(188);
      expect(cuentaConmigo.genre).to.be.eql(['Rap', 'Hip-Hop', 'Urban']);
      expect(cuentaConmigo.single).to.be.eql(false);
      expect(cuentaConmigo.views).to.be.eql(2800000);
    });
  });
});
