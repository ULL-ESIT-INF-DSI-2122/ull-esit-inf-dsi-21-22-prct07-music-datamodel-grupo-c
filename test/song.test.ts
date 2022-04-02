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
    });
  });
});
