// import Sinon from 'sinon';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { helloWorld } from '../src/index';

// Sinon.stub(console, 'log');

describe('Dummy empty test', () => {
  it('True test', () => {
    expect(true).to.be.true;
    helloWorld();
  });
});
