import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Group } from '../src/group.class';

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
    it('Name getter', () => {
      expect(fitoYFitipaldis.name).to.be.eql('Fito y Fitipaldis');
      expect(elCantoDelLoco.name).to.be.eql('El Canto del Loco');
    });    
    
    it('Artists getter', () => {
      expect(fitoYFitipaldis.artists).to.be.eql(
        ['Adolfo Cabrales', 'Javier Alzola', 'Joserra Senperena', 'Carlos Raya', 'Alejandro Climent', 'Daniel Griffin']);
      expect(elCantoDelLoco.artists).to.be.eql(
        ['Dani Martín', 'David Otero', 'Chema Ruiz', 'Jandro Velázquez', 'Iván Ganchegui']);
    });

    it('Year getter', () => {
      expect(fitoYFitipaldis.year).to.be.eql(1998);
      expect(elCantoDelLoco.year).to.be.eql(1994);
    });    

    it('Genres getter', () => {
      expect(fitoYFitipaldis.genres).to.be.eql(
        ['Rock and roll', 'Blues rock', 'Pop rock', 'Rockabilly']);
      expect(elCantoDelLoco.genres).to.be.eql(
        ['Pop rock', 'Pop punk', 'Pop', 'Power pop']);
    });
    
    it('Albums getter', () => {
      expect(fitoYFitipaldis.albums).to.be.eql(
        ['A puerta cerrada', 'Los sueños locos', 'Lo más lejos a tu lado', 'Por la boca vive el pez', 'Huyendo contigo de mi']);
      expect(elCantoDelLoco.albums).to.be.eql(
        ['El Canto del Loco', 'A contracorriente', 'Estados de ánimo', 'Zapatillas', 'Personas']);
    });    

    it('monthlyListeners getter', () => {
      expect(fitoYFitipaldis.monthlyListeners).to.be.eql(2044949);
      expect(elCantoDelLoco.monthlyListeners).to.be.eql(2622773);
    });    
  });
});