import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import Playlist from './playlist.class';
import { run } from './main'; // eslint-disable-line
import PlaylistManager from './playlitsManager.class';
import { PlaylistInterface } from './database.interfaces';
import { SongInterface } from './database.interfaces';

export let playlistManager: PlaylistManager = new PlaylistManager();

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
                      case 'Add Song to a playlist': {
                        const songDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
                        const serializedSongs = songDb.get('songs').value();
                        const songOptions = serializedSongs.map((song: SongInterface) => song.name);

                        inquirer
                          .prompt([
                            {
                              type: 'list',
                              name: 'addOneSong',
                              message: 'Choose a song to add:',
                              choices: [
                                ...songOptions,
                                new inquirer.Separator(),
                                'Go Back',
                              ],
                            },
                          ])
                          .then((queryAnswer) => {
                            if (queryAnswer.addOneSong === 'Go back') {
                              console.clear();
                              playlistMenu();
                            } else {
                              serialized.forEach((playlist: PlaylistInterface) => {
                                if (playlist.name === answerSearch.playlistSearch) {
                                  playlist.songs.push(queryAnswer.addOneSong);
                                }
                              });
                              playlistDb.set('playlists', serialized).write();
                              playlistManager = new PlaylistManager();
                              console.log(`Added ${queryAnswer.addOneSong} to ${answerSearch.playlistSearch} successfully`)
                              playlistMenu();
                              playlistDb.set('playlists', serialized).write();
                            }
                          });
                        break;
                      }
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
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'default',
                message: 'From scratch or from an existing one?:',
                choices: [
                  'Scratch',
                  'Existing',
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((modeOption) => {
              if (modeOption.default === 'Go Back') {
                console.clear();
                playlistMenu();
              } else {
                if (modeOption.default === 'Scratch') {
                  inquirer
                    .prompt([
                      {
                        type: 'input',
                        name: 'addName',
                        message: 'Pick a name for your playlist:',
                        validate(value) {
                          const pass = !playlistManager
                            .playlists
                            .map((p) => p.name).includes(value) && value !== '';
                          if (pass) {
                            return true;
                          }
                          return 'Please enter valid name, no duplicate playlists allowed and no empty names';
                        },
                      },
                    ])
                    .then((queryAnswers) => {
                      const newPlaylist: Playlist = new Playlist(
                        queryAnswers.addName,
                      );
                      playlistManager.createPlaylist(newPlaylist, []);
                      console.clear();
                      console.log(`Playlist ${queryAnswers.addName} created, its time to fill it with songs`);
                      playlistMenu();
                    });
                }
                if (modeOption.default === 'Existing') {
                  const playlistDb: lowdb.LowdbSync <PlaylistInterface> = lowdb(new FileSync('database/database-playlist.json'));
                  const serialized = playlistDb.get('playlists').value();
                  const options = serialized.map((el: PlaylistInterface) => el.name);
                  inquirer
                    .prompt([
                      {
                        type: 'input',
                        name: 'addName',
                        message: 'Pick a name for your playlist:',
                        validate(value) {
                          const pass = !playlistManager
                            .playlists
                            .map((p) => p.name).includes(value) && value !== '';
                          if (pass) {
                            return true;
                          }
                          return 'Please enter valid name, no duplicate playlists allowed and no empty names';
                        },
                      },
                      {
                        type: 'list',
                        name: 'parentPlaylist',
                        message: 'Select a playlist to copy:',
                        choices: [
                          ...options,
                        ],
                      },
                    ])
                    .then((queryAnswers) => {
                      const inx: number = playlistManager.playlists
                        .map((playlist) => playlist.name)
                        .indexOf(queryAnswers.parentPlaylist);
                      const newPlaylist: Playlist = new Playlist(
                        queryAnswers.addName,
                      );
                      playlistManager.playlist(inx).songs.forEach((song) => {
                        newPlaylist.addSong(song);
                      });

                      playlistManager.playlist(inx).albums.forEach((album) => {
                        newPlaylist.addAlbum(album);
                      });

                      playlistManager.playlist(inx).genres.forEach((genre) => {
                        newPlaylist.addGenre(genre);
                      });

                      playlistManager.playlist(inx).artists.forEach((artist) => {
                        newPlaylist.addArtist(artist);
                      });

                      playlistManager.playlist(inx).groups.forEach((group) => {
                        newPlaylist.addGroup(group);
                      });
                      playlistManager.createPlaylist(newPlaylist, []);
                      console.clear();
                      console.log(`Playlist ${queryAnswers.addName} created, its time to fill it with songs`);
                      playlistMenu();
                    });
                }
              }
            });
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
