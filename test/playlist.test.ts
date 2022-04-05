import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Playlist } from '../src/playlist.class';

const clasicsSpain = new Playlist(
  'Clasicos España',
  ['Princesas', 'Pajaros de Barro', 'Cero', 'Quiero Ser', 'Caminando por la vida', 'Eras Tu', '90 Minutos', 'Son de Amores'],
  28800,
  ['Pop', 'Rock', 'Punk', 'Urban', 'Instrumental']
);



