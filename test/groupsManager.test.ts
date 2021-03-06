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

  describe('Single group albums can be sorted and outputed', () => {
    it('Alphabetically asc', () => {
      expect(systemManager.viewGroupAlbums(0)).to.be.eql(
        'Animals As Leaders albums:\n'
        + 'Parrhesia\n',
      );
    });
    it('Alphabetically desc', () => {
      expect(systemManager.viewGroupAlbums(0, true)).to.be.eql(
        'Animals As Leaders albums:\n'
        + 'Parrhesia\n',
      );
    });
    it('By release year asc', () => {
      expect(systemManager.viewGroupAlbumsByRelease(0)).to.be.eql(
        'Animals As Leaders albums:\n'
        + 'Parrhesia\n',
      );
    });
    it('By release year desc', () => {
      expect(systemManager.viewGroupAlbumsByRelease(0, true)).to.be.eql(
        'Animals As Leaders albums:\n'
        + 'Parrhesia\n',
      );
    });
  });

  describe('Single group playlist can be sorted and outputed', () => {
    it('Alphabetically asc', () => {
      expect(systemManager.viewGroupPlaylists(0)).to.be.eql(
        'Animals As Leaders playlists:\n'
        + 'Metal lover\n',
      );
    });
    it('Alphabetically desc', () => {
      expect(systemManager.viewGroupPlaylists(0, true)).to.be.eql(
        'Animals As Leaders playlists:\n'
        + 'Metal lover\n',
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
    it('Manager can update existing group', () => {
      const updatedGroup: Group = new Group(
        'The Beatles',
        [],
        1990,
        ['Punk Rock'],
        ['Abbey Road'],
        999999,
      );
      systemManager.updateGroup(6, updatedGroup);
      expect(systemManager.group(6).name).to.be.eq('The Beatles');
    });
    it('Manager can save group in database', () => {
      systemManager.saveGroup(6);
    });
    it('Manager cant delete system Group from database', () => {
      expect(systemManager.deleteGroup(1)).to.be.false;
    });
    it('Manager can delete user Group from database', () => {
      expect(systemManager.deleteGroup(6)).to.be.true;
    });
  });
});
