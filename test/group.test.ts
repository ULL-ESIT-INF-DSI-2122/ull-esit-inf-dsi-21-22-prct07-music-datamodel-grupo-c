import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Group } from '../src/group';

const fitoYFitipaldis = new Group(
  'Fito y Fitipaldis',
  ['Adolfo Cabrales', 'Javier Alzola', 'Joserra Senperena', 'Carlos Raya', 'Alejandro Climent', 'Daniel Griffin'],
  1998,
  ['Rock and roll', 'Blues rock', 'Pop rock', 'Rockabilly'],
  ['A puerta cerrada', 'Los sueños locos', 'Lo más lejos a tu lado', 'Por la boca vive el pez', 'Huyendo contigo de mi'],
  2044949
)

const elCantoDelLoco = new Group(
  'El Canto del Loco',
  ['Dani Martín', 'David Otero', 'Chema Ruiz', 'Jandro Velázquez', 'Iván Ganchegui'],
  1994,
  ['Pop rock', 'Pop punk', 'Pop', 'Power pop'],
  ['El Canto del Loco', 'A contracorriente', 'Estados de ánimo', 'Zapatillas', 'Personas'],
  2622773
)

describe('Group class Tests', () => {
  describe('Group Class Getters', () => {
    it('', () => {

    });
  });
});