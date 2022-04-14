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

export default class GroupManager {
  private _groups: Group[];

  constructor() {
    this._groups = [];
    const groupDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
    const serialized = groupDb.get('groups').value();
    this.deserializeGroups(serialized);
  }

  get groups(): Group[] { return this._groups; }



  public group(index: number = 0): Group { return this.groups[index]; }

  private deserializeGroups(groups: GroupInterface[]) {
    groups.forEach((group) => {
      const systemGroup = new Group(group.name);
      this._groups.push(systemGroup);
    });
  }
}
