import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
import { run } from './main'; // eslint-disable-line
import PlaylistManager from './playlitsManager.class';
import { PlaylistInterface } from './database.interfaces';

export const playlistManager: PlaylistManager = new PlaylistManager();

export function playlistMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'playlistMenu',
        message: 'Choose an action:',
        choices: [
          'List all playlists',
          'Search playlist',
          'Create playlist',
          'Save playlist',
          'Delete playlist',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((playlistMenuAnswers) => {
      switch (playlistMenuAnswers.playlistMenu) {
        case 'List all playlists': {
          console.log(playlistManager.preview());
          playlistMenu();
          break;
        }
        case 'Search playlist': {
          const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
          const serialized = playlistDb.get('playlists').value();
          const options = playlistManager
            .playlists
            .filter((playlist) => serialized
              .map((el: PlaylistInterface) => el.name)
              .includes(playlist.name));
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'playlistSearch',
                message: 'Choose a playlist:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((answerSearch) => {
              if (answerSearch.playlistSearch === 'Go Back') {
                console.clear();
                playlistMenu();
              } else {
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      name: 'playlistActions',
                      message: 'Choose an action:',
                      choices: [
                        'Sort playlist',
                        'List playlist',
                        'Add Song to a playlist',
                        'Delete Song from a playlist',
                        new inquirer.Separator(),
                        'Go Back',
                      ],
                    },
                  ])
                  .then((playlistActionsAnswers) => {
                    switch (playlistActionsAnswers.playlistActions) {
                      case 'Sort playlist': {
                        inquirer
                          .prompt([
                            {
                              type: 'list',
                              name: 'sortMenu',
                              message: 'Choose an sort method:',
                              choices: [
                                'By song name',
                                'By duration',
                                'By artist',
                                'By year',
                                'By genre',
                                'By number of listeners',
                                new inquirer.Separator(),
                                'Go Back',
                                new inquirer.Separator(),
                              ],
                            },
                          ])
                          .then((sortAnswers) => {
                            switch (sortAnswers.sortMenu) {
                              case 'By song name': {
                                inquirer
                                  .prompt([
                                    {
                                      type: 'list',
                                      name: 'nameAscDesc',
                                      message: 'Asc or Desc?:',
                                      choices: [
                                        'Asc',
                                        'Desc',
                                        new inquirer.Separator(),
                                        'Go Back',
                                      ],
                                    },
                                  ])
                                  .then((nameSortAnswers) => {
                                    const inx: number = playlistManager.playlists
                                      .map((playlist) => playlist.name)
                                      .indexOf(answerSearch.playlistSearch);
                                    switch (nameSortAnswers.nameAscDesc) {
                                      case 'Asc': {
                                        const playlistAux = playlistManager
                                          .playlist(inx);
                                        playlistAux.sortBySongName(false);
                                        console.log(playlistAux.toString());
                                        break;
                                      }
                                      case 'Desc': {
                                        const playlistAux = playlistManager.playlist(inx);
                                        playlistAux.sortBySongName(true);
                                        console.log(playlistAux.toString());
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                  });
                                break;
                              }
                              case 'By duration': {
                                break;
                              }
                              // case 'By artist': {
                              //   break;
                              // }
                              // case 'By year': {
                              //   break;
                              // }
                              // case 'By genre': {
                              //   break;
                              // }
                              // case 'By number of listeners': {
                              //   break;
                              // }
                              // case 'Go Back': {
                              //   break;
                              // }
                              default: {
                                break;
                              }
                            }
                          });
                        break;
                      }
                      // case 'List playlist': {
                      //   break;
                      // }
                      // case 'Add Song to a playlist': {
                      //   break;
                      // }
                      // case 'Delete Song from a playlist': {
                      //   break;
                      // }
                      // case 'Go Back': {
                      //   break;
                      // }
                      default:
                        break;
                    }
                  });
              }
            });
          break;
        }
        case 'Create playlist': {
          playlistMenu();
          break;
        }
        case 'Save playlist': {
          playlistMenu();
          break;
        }
        case 'Delete playlist': {
          playlistMenu();
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
