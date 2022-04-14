import { describe, it } from 'mocha';
import { expect } from 'chai';
import GroupsManager from '../src/groupsManager.class';
import { Group } from '../src/group.class';

describe('Group Manager class tests', () => {
  const systemManager: GroupsManager = new GroupsManager();
  const newGroup: Group = new Group(
    'The Rolling Stones',
    [],
    1962,
    ['Punk Rock'],
    ['Aftermath'],
    123456,
  );

  describe('Manager starts with system default groups', () => {
    it('Manager object builds with 3 system playlists', () => {
      expect(systemManager.groups.length).to.be.eql(5);
    });
    it('Manager can output and list groups', () => {
      expect(systemManager.preview()).to.be.eql(
        'GROUPS\n\n'
        + 'Animals As Leaders\n'
        + 'Norma Jean\n'
        + 'Artic Monkeys\n'
        + 'Billy Talent\n'
        + 'The Dillinger Escape Plan\n',
      );
    });
  });
  describe('Manager can operate through groups objects', () => {
    it('Manager can create new group', () => {
      systemManager.createGroup(newGroup);
      expect(systemManager.groups.length).to.be.eq(6);
    });
    it('Manager cant create existing group', () => {
      systemManager.createGroup(newGroup);
      expect(systemManager.groups.length).to.be.eq(6);
    });
    it('Manager can update existing genre', () => {
      const updatedGroup: Group = new Group(
        'The Rolling Stones',
        [],
        1990,
        ['Punk Rock'],
        ['Aftermath'],
        999999,
      );
      systemManager.updateGroup(11, updatedGroup);
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
