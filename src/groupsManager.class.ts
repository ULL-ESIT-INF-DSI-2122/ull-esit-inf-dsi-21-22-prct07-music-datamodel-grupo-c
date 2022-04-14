import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Group } from './group.class';

interface GroupInterface {
  name: string,
  artists: string[],
  year: number,
  genres: string[],
  albums: string[];
  monthlyListeners: number,
  origin: string[],
}

export default class GroupsManager {
  private _groups: Group[];

  constructor() {
    this._groups = [];
    const groupDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
    const serialized = groupDb.get('groups').value();
    this.deserializeGroups(serialized);
  }

  get groups(): Group[] { return this._groups; }

  public preview(): string {
    let output = 'GROUPS\n\n';
    this.groups.forEach((group) => {
      output += `${group.name}\n`;
    });
    return output;
  }

  public group(index: number = 0): Group { return this.groups[index]; }

  public createGroup(group: Group) {
    if (!this._groups.find((el: Group) => el.name === group.name)) {
      const newGroup: Group = new Group(group.name);
      this._groups.push(newGroup);
    }
  }

  public updateGroup(index: number, group: Group) { this._groups[index] = group; }

  public saveGroup(index: number) {
    const groupDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
    const groupToSave: Group = this.group(index);
    const serialized = groupDb.get('groups').value();
    if (!serialized.find((el: GroupInterface) => el.name === groupToSave.name)) {
      serialized.push({
        name: groupToSave.name,
        artists: groupToSave.artists,
        year: groupToSave.year,
        genres: groupToSave.genres,
        albums: groupToSave.albums,
        monthlyListeners: groupToSave.monthlyListeners,
        origin: 'User',
      });
      groupDb.set('groups', serialized).write();
    }
  }

  public deleteGroup(index: number): boolean {
    const groupDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
    const groupToDelete: Group = this.group(index);
    let serialized = groupDb.get('groups').value();
    if (serialized.find((el: GroupInterface) => el.name === groupToDelete.name)
    && serialized.find((el: GroupInterface) => el.name === groupToDelete.name).origin === 'User') {
      serialized = serialized.filter((el: GroupInterface) => el.name !== groupToDelete.name);
      groupDb.set('groups', serialized).write();
      return true;
    }
    return false;
  }

  private deserializeGroups(groups: GroupInterface[]) {
    groups.forEach((group) => {
      const systemGroup = new Group(group.name);
      this._groups.push(systemGroup);
    });
  }
}
