import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Group } from './group.class';
import { run } from './main'; // eslint-disable-line
import GroupManager from './groupsManager.class';
import { GroupInterface } from './database.interfaces';

const groupsManager: GroupManager = new GroupManager();
const groupArray: Group[] = [];

export function groupMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'groupMenu',
        message: 'Choose an action:',
        choices: [
          'List all groups',
          'Add new group',
          'Save group',
          'Edit group',
          'Delete group',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((answers: any) => {
      switch (answers.groupMenu) {
        case 'List all groups': {
          console.log(groupsManager.preview());
          groupMenu();
          break;
        }
        case 'Add new group': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'addName',
                message: 'Type new name:',
              },
              {
                type: 'input',
                name: 'addArtists',
                message: 'Type new artist:',
              },
              {
                type: 'input',
                name: 'addYear',
                message: 'Add year:',
                validate(value: any) {
                  const pass = value.match(
                    /^[0-9]*$/,
                  );
                  if (pass) {
                    return true;
                  }
                  return 'Please enter a number';
                },
              },
              {
                type: 'input',
                name: 'addGenres',
                message: 'Type new genres:',
              },
              {
                type: 'input',
                name: 'addAlbums',
                message: 'Type new albums:',
              },
              {
                type: 'input',
                name: 'addListeners',
                message: 'Add monthly listeners:',
                validate(value: any) {
                  const pass = value.match(
                    /^[0-9]*$/,
                  );
                  if (pass) {
                    return true;
                  }
                  return 'Please enter a number';
                },
              },
            ])
            .then((newGroupAnswers: any) => {
              const newGroup: Group = new Group(
                newGroupAnswers.addName,
                newGroupAnswers.addArtists.split(',').map((el: string) => el.trim()),
                Number(newGroupAnswers.addYear),
                newGroupAnswers.addGenres.split(',').map((el: string) => el.trim()),
                newGroupAnswers.addAlbums.split(',').map((el: string) => el.trim()),
                Number(newGroupAnswers.addListeners),
              );
              groupsManager.createGroup(newGroup);
              groupArray.push(newGroup);
              groupMenu();
            });
          break;
        }
        case 'Save group': {
          const groupsDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
          const serialized = groupsDb.get('groups').value();
          const options = groupsManager
            .groups
            .filter((group) => !serialized
              .map((el: GroupInterface) => el.name)
              .includes(group.name))
            .map((el) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'groupEdit',
                message: 'Select a group to save:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((editGroupAnswer) => {
              if (editGroupAnswer.groupEdit === 'Go Back') {
                console.clear();
                groupMenu();
              } else {
                const inx: number = groupsManager.groups
                  .map((group) => group.name)
                  .indexOf(editGroupAnswer.groupEdit);
                groupsManager.saveGroup(inx);
                groupMenu();
              }
            });
          break;
        }
        case 'Edit group': {
          const groupsDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
          const serialized = groupsDb.get('groups').value();
          const options = serialized
            .filter((group: GroupInterface) => group.origin === 'User')
            .map((el: GroupInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'groupEdit',
                message: 'Select a group to Edit:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go back',
                ],
              },
            ]).then((editGroupAnswer: any) => {
              if (editGroupAnswer.songEdit === 'Go back') {
                console.clear();
                groupMenu();
              } else {
                const inx: number = groupsManager.groups
                  .map((genre) => genre.name)
                  .indexOf(editGroupAnswer.groupEdit);
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'editArtists',
                      message: 'Edit artists:',
                    },
                    {
                      type: 'input',
                      name: 'editYear',
                      message: 'Edit year:',
                      validate(value: any) {
                        const pass = value.match(
                          /^[0-9]*$/,
                        );
                        if (pass) {
                          return true;
                        }
                        return 'Please enter a number';
                      },
                    },
                    {
                      type: 'input',
                      name: 'editGenres',
                      message: 'Edit genres:',
                    },
                    {
                      type: 'input',
                      name: 'editAlbums',
                      message: 'Edit albums:',
                    },
                    {
                      type: 'input',
                      name: 'editListeners',
                      message: 'Edit monthly listeners:',
                      validate(value: any) {
                        const pass = value.match(
                          /^[0-9]*$/,
                        );
                        if (pass) {
                          return true;
                        }
                        return 'Please enter a number';
                      },
                    },
                  ])
                  .then((editGroupAnswer: any) => {
                    let newArtistsEdit: string[] = editGroupAnswer.editArtists.split(',').map((el: string) => el.trim());
                    let newYearEdit: number = Number(editGroupAnswer.editYear);
                    let newGenresEdit: string[] = editGroupAnswer.editGenres.split(',').map((el: string) => el.trim());
                    let newAlbumsEdit: string[] = editGroupAnswer.editAlbums.split(',').map((el: string) => el.trim());
                    let newListenersEdit: number = Number(editGroupAnswer.editListeners);

                    if (newArtistsEdit.length === 0) {
                      newArtistsEdit = groupsManager.group(inx).artists;
                    }
                    if (editGroupAnswer.editYear === '') {
                      newYearEdit = groupsManager.group(inx).year;
                    }
                    if (newGenresEdit.length === 0) {
                      newGenresEdit = groupsManager.group(inx).genres;
                    }
                    if (newAlbumsEdit.length === 0) {
                      newAlbumsEdit = groupsManager.group(inx).albums;
                    }
                    if (editGroupAnswer.editListeners === '') {
                      newListenersEdit = groupsManager.group(inx).monthlyListeners;
                    }
                    const newGroup: Group = new Group(
                      groupsManager.group(inx).name,
                      newArtistsEdit,
                      newYearEdit,
                      newGenresEdit,
                      newAlbumsEdit,
                      newListenersEdit,
                    );
                    groupsManager.updateGroup(inx, newGroup);
                    groupsManager.saveGroup(inx, true);
                    groupMenu();
                  });
              }
            });
          break;
        }
        case 'Delete group': {
          const groupsDb: lowdb.LowdbSync <GroupInterface> = lowdb(new FileSync('database/database-groups.json'));
          const serialized = groupsDb.get('groups').value();
          const numberOfUserGroups: number = serialized.filter((group: GroupInterface) => group.origin === 'User').length;
          if (numberOfUserGroups > 0) {
            const options = serialized
              .filter((group: GroupInterface) => group.origin === 'User')
              .map((el: GroupInterface) => el.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'groupDelete',
                  message: 'Select a group to Delete:',
                  choices: [
                    ...options,
                    new inquirer.Separator(),
                    'Go back',
                  ],
                },
              ])
              .then((deleteGroupAnswer: any) => {
                if (deleteGroupAnswer.groupDelete === 'Go back') {
                  console.clear();
                  groupMenu();
                } else {
                  const inx: number = groupsManager.groups
                    .map((group) => group.name)
                    .indexOf(deleteGroupAnswer.groupDelete);
                  groupsManager.deleteGroup(inx);
                  console.clear();
                  groupMenu();
                }
              });
          }
          break;
        }
        case 'Go Back': {
          console.clear();
          run();
          break;
        }
        default: {
          break;
        }
      }
    });
}
