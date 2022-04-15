import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
import { run } from './main'; // eslint-disable-line
import PlaylistManager from './playlitsManager.class';
import { PlaylistInterface } from './database.interfaces';
import SongsManager from './songsManager.class';
import { SongInterface } from './database.interfaces';
import { Song } from './song.class';

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
          let playlistAux;
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
                                    playlistAux = playlistManager.playlist(inx);
                                    switch (nameSortAnswers.nameAscDesc) {
                                      case 'Asc': {
                                        playlistAux.sortBySongName(false);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Desc': {
                                        playlistAux.sortBySongName(true);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Go Back': {
                                        playlistMenu();
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
                                inquirer
                                  .prompt([
                                    {
                                      type: 'list',
                                      name: 'durationAscDesc',
                                      message: 'Asc or Desc?:',
                                      choices: [
                                        'Asc',
                                        'Desc',
                                        new inquirer.Separator(),
                                        'Go Back',
                                      ],
                                    },
                                  ])
                                  .then((durationSortAnswers) => {
                                    const inx: number = playlistManager.playlists
                                      .map((playlist) => playlist.name)
                                      .indexOf(answerSearch.playlistSearch);
                                    playlistAux = playlistManager.playlist(inx);
                                    switch (durationSortAnswers.durationAscDesc) {
                                      case 'Asc': {
                                        playlistAux.sortBySongDuration(false);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Desc': {
                                        playlistAux.sortBySongDuration(true);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Go Back': {
                                        playlistMenu();
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                  });
                                break;
                              }
                              case 'By artist': {
                                inquirer
                                  .prompt([
                                    {
                                      type: 'list',
                                      name: 'artistAscDesc',
                                      message: 'Asc or Desc?:',
                                      choices: [
                                        'Asc',
                                        'Desc',
                                        new inquirer.Separator(),
                                        'Go Back',
                                      ],
                                    },
                                  ])
                                  .then((artistSortAnswers) => {
                                    const inx: number = playlistManager.playlists
                                      .map((playlist) => playlist.name)
                                      .indexOf(answerSearch.playlistSearch);
                                    playlistAux = playlistManager.playlist(inx);
                                    switch (artistSortAnswers.artistAscDesc) {
                                      case 'Asc': {
                                        playlistAux.sortByArtistName(false);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Desc': {
                                        playlistAux.sortByArtistName(true);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Go Back': {
                                        playlistMenu();
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                  });
                                break;
                              }
                              case 'By year': {
                                inquirer
                                  .prompt([
                                    {
                                      type: 'list',
                                      name: 'yearAscDesc',
                                      message: 'Asc or Desc?:',
                                      choices: [
                                        'Asc',
                                        'Desc',
                                        new inquirer.Separator(),
                                        'Go Back',
                                      ],
                                    },
                                  ])
                                  .then((yearSortAnswers) => {
                                    const inx: number = playlistManager.playlists
                                      .map((playlist) => playlist.name)
                                      .indexOf(answerSearch.playlistSearch);
                                    playlistAux = playlistManager.playlist(inx);
                                    switch (yearSortAnswers.yearAscDesc) {
                                      case 'Asc': {
                                        playlistAux.sortByAlbumRelease(false);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Desc': {
                                        playlistAux.sortByAlbumRelease(true);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Go Back': {
                                        playlistMenu();
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                  });
                                break;
                              }
                              case 'By genre': {
                                inquirer
                                  .prompt([
                                    {
                                      type: 'list',
                                      name: 'genreAscDesc',
                                      message: 'Asc or Desc?:',
                                      choices: [
                                        'Asc',
                                        'Desc',
                                        new inquirer.Separator(),
                                        'Go Back',
                                      ],
                                    },
                                  ])
                                  .then((genreSortAnswers) => {
                                    const inx: number = playlistManager.playlists
                                      .map((playlist) => playlist.name)
                                      .indexOf(answerSearch.playlistSearch);
                                    playlistAux = playlistManager.playlist(inx);
                                    switch (genreSortAnswers.genreAscDesc) {
                                      case 'Asc': {
                                        playlistAux.sortByGenre(false);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Desc': {
                                        playlistAux.sortByGenre(true);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Go Back': {
                                        playlistMenu();
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                  });
                                break;
                              }
                              case 'By number of listeners': {
                                inquirer
                                  .prompt([
                                    {
                                      type: 'list',
                                      name: 'listenersAscDesc',
                                      message: 'Asc or Desc?:',
                                      choices: [
                                        'Asc',
                                        'Desc',
                                        new inquirer.Separator(),
                                        'Go Back',
                                      ],
                                    },
                                  ])
                                  .then((listenersSortAnswers) => {
                                    const inx: number = playlistManager.playlists
                                      .map((playlist) => playlist.name)
                                      .indexOf(answerSearch.playlistSearch);
                                    playlistAux = playlistManager.playlist(inx);
                                    switch (listenersSortAnswers.listenersAscDesc) {
                                      case 'Asc': {
                                        playlistAux.sortBySongViews(false);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Desc': {
                                        playlistAux.sortBySongViews(true);
                                        console.log(playlistAux.toString());
                                        playlistMenu();
                                        break;
                                      }
                                      case 'Go Back': {
                                        playlistMenu();
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                  });
                                break;
                              }
                              case 'Go Back': {
                                playlistMenu();
                                break;
                              }
                              default: {
                                break;
                              }
                            }
                          });
                        break;
                      }
                      case 'List playlist': {
                        const inx: number = playlistManager.playlists
                          .map((playlist) => playlist.name)
                          .indexOf(answerSearch.playlistSearch);
                        console.log(playlistManager.playlist(inx).toString());
                        playlistMenu();
                        break;
                      }
                      // case 'Add Song to a playlist': {
                      //   break;
                      // }
                      case 'Delete Song from a playlist': {
                        const inx: number = playlistManager.playlists
                          .map((playlist) => playlist.name)
                          .indexOf(answerSearch.playlistSearch);
                        const songOptions = playlistManager.playlist(inx).allSongsNames;
                        inquirer
                          .prompt([
                            {
                              type: 'list',
                              name: 'deleteOneSong',
                              message: 'Choose a song to delete:',
                              choices: [
                                ...songOptions,
                                new inquirer.Separator(),
                                'Go Back',
                              ],
                            },
                          ])
                          .then((deleteOneSongAnswer) => {
                            if (deleteOneSongAnswer.deleteOneSong === 'Go back') {
                              console.clear();
                              playlistMenu();
                            } else {
                              playlistManager.playlist(inx)
                                .removeSong(deleteOneSongAnswer.deleteOneSong);
                              playlistManager.savePlaylist(inx, true);
                              playlistMenu();
                            }
                          });
                        break;
                      }
                      case 'Go Back': {
                        playlistMenu();
                        break;
                      }
                      default:
                        break;
                    }
                  });
              }
            });
          break;
        }
        case 'Create playlist': {
          break;
        }
        case 'Save playlist': {
          const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
          const serialized = playlistDb.get('playlists').value();
          const options = playlistManager
            .playlists
            .filter((playlist) => !serialized
              .map((el: PlaylistInterface) => el.name)
              .includes(playlist.name))
            .map((el) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'playlistSave',
                message: 'Select a playlist to save:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((savePlaylistAnswer) => {
              if (savePlaylistAnswer.playlistSave === 'Go Back') {
                console.clear();
                playlistMenu();
              } else {
                const inx: number = playlistManager.playlists
                  .map((playlist) => playlist.name)
                  .indexOf(savePlaylistAnswer.playlistSave);
                playlistManager.savePlaylist(inx);
                playlistMenu();
              }
            });
          break;
        }
        case 'Delete playlist': {
          const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
          const serialized = playlistDb.get('playlists').value();
          const numberOfPlaylists: number = serialized.filter((playlist: PlaylistInterface) => playlist.origin === 'User').length;
          if (numberOfPlaylists > 0) {
            const options = serialized
              .filter((playlist: PlaylistInterface) => playlist.origin === 'User')
              .map((el: PlaylistInterface) => el.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'playlistDelete',
                  message: 'Select a song to Delete:',
                  choices: [
                    ...options,
                    new inquirer.Separator(),
                    'Go back',
                  ],
                },
              ])
              .then((deletePlaylistAnswer) => {
                if (deletePlaylistAnswer.playlistDelete === 'Go back') {
                  console.clear();
                  playlistMenu();
                } else {
                  const inx: number = playlistManager.playlists
                    .map((playlist) => playlist.name)
                    .indexOf(deletePlaylistAnswer.playlistDelete);
                  playlistManager.deletePlaylist(inx);
                  console.clear();
                  playlistMenu();
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
