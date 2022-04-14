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
  }
}