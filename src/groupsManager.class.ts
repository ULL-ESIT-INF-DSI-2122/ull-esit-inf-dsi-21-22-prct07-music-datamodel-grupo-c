import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Group } from './group.class';
import { GroupInterface, SongInterface, AlbumInterface, PlaylistInterface } from './database.interfaces';

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

  public viewGroupAlbums(inx: number, desc: boolean = false): string {
    let output = `${this.group(inx).name} albums:\n`;
    const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const serialized: any = albumDb.get('albums').value();
    if (desc) {
      serialized
        .filter((el: AlbumInterface) => el.artist === this.group(inx).name)
        .sort((a: AlbumInterface, b: AlbumInterface) => {
          if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) { return -1; }
          if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) { return 1; }
          return 0;
        }).map((el: AlbumInterface) => el.name)
        .reverse()
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    } else {
      serialized
        .filter((el: AlbumInterface) => el.artist === this.group(inx).name)
        .sort((a: AlbumInterface, b: AlbumInterface) => {
          if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) { return -1; }
          if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) { return 1; }
          return 0;
        }).map((el: AlbumInterface) => el.name)
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    }

    return output;
  }

  public viewGroupAlbumsByRelease(inx: number, desc: boolean = false): string {
    const albumDb: lowdb.LowdbSync <AlbumInterface> = lowdb(new FileSync('database/database-albums.json'));
    const serialized: any = albumDb.get('albums').value();

    let output = `${this.group(inx).name} albums:\n`;
    if (desc) {
      serialized
        .filter((el: AlbumInterface) => el.artist === this.group(inx).name)
        .sort((a: AlbumInterface, b: AlbumInterface) => a.year - b.year)
        .map((el: AlbumInterface) => el.name)
        .reverse()
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    } else {
      serialized
        .filter((el: AlbumInterface) => el.artist === this.group(inx).name)
        .sort((a: AlbumInterface, b: AlbumInterface) => a.year - b.year)
        .map((el: AlbumInterface) => el.name)
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    }
    return output;
  }

  public groupSongs(inx: number): string[] {
    const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serialized = songsDb.get('songs').value();
    return serialized
      .filter((song: SongInterface) => song.artist === this.group(inx).name)
      .map((song: SongInterface) => song.name);
  }

  public viewGroupSongs(inx: number, desc: boolean = false): string {
    let output = `${this.group(inx).name} songs:\n`;

    if (desc) {
      this.groupSongs(inx)
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        }).reverse()
        .forEach((song) => {
          output += `${song}\n`;
        });
    } else {
      this.groupSongs(inx)
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        })
        .forEach((song) => {
          output += `${song}\n`;
        });
    }
    return output;
  }

  public viewGroupSongsbyListeners(inx: number, desc: boolean = false): string {
    const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
    const serialized = songsDb.get('songs').value();
    let output = `${this.group(inx).name} songs:\n`;

    if (desc) {
      serialized
        .filter((el: SongInterface) => el.artist === this.groups[inx].name)
        .sort((a: SongInterface, b: SongInterface) => a.views - b.views)
        .map((el: SongInterface) => el.name)
        .reverse()
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    } else {
      serialized
        .filter((el: SongInterface) => el.artist === this.groups[inx].name)
        .sort((a: SongInterface, b: SongInterface) => a.views - b.views)
        .map((el: SongInterface) => el.name)
        .forEach((song: string) => {
          output += `${song}\n`;
        });
    }
    return output;
  }

  public groupPlaylists(inx: number): string[] {
    const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
    const serialized = playlistDb.get('playlists').value();
    return serialized
      .filter((playlist: PlaylistInterface) => playlist.groups.includes(this.group(inx).name))
      .map((playlist: PlaylistInterface) => playlist.name);
  }

  public viewGroupPlaylists(inx: number, desc: boolean = false): string {
    let output = `${this.group(inx).name} playlists:\n`;

    if (desc) {
      this.groupPlaylists(inx)
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        }).reverse()
        .forEach((playlist) => {
          output += `${playlist}\n`;
        });
    } else {
      this.groupPlaylists(inx)
        .sort((a, b) => {
          if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) { return -1; }
          if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) { return 1; }
          return 0;
        })
        .forEach((playlist) => {
          output += `${playlist}\n`;
        });
    }
    return output;
  }

  public group(index: number = 0): Group { return this.groups[index]; }

  public createGroup(group: Group) {
    if (!this._groups.find((el: Group) => el.name === group.name)) {
      const newGroup: Group = new Group(
        group.name,
        group.artists,
        group.year,
        group.genres,
        group.albums,
        group.monthlyListeners,
      );
      this._groups.push(newGroup);
    }
  }

  public updateGroup(index: number, group: Group) { this._groups[index] = group; }

  public saveGroup(index: number, force: boolean = false) {
    const groupDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
    const groupToSave: Group = this.group(index);
    let serialized = groupDb.get('groups').value();
    if (force) {
      serialized = serialized.map((group: GroupInterface) => {
        if (group.name === groupToSave.name) {
          return {
            name: groupToSave.name,
            artists: groupToSave.artists,
            year: groupToSave.year,
            genres: groupToSave.genres,
            albums: groupToSave.albums,
            monthlyListeners: groupToSave.monthlyListeners,
            origin: 'User',
          };
        }
        return group;
      });
    }
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
    }
    groupDb.set('groups', serialized).write();
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
