import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { run } from './main'; // eslint-disable-line
import ArtistsManager from './artistsManager.class';
import { ArtistInterface } from './database.interfaces';
import { Artist } from './artist.class';

const artistsManager: ArtistsManager = new ArtistsManager();

export function artistsMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'artistsMenu',
        message: 'Choose an action:',
        choices: [
          'List artists',
          'List artist playlists',
          'List artist songs',
          'List artist albums',
          'Add new artist',
          'Save artist',
          'Edit artist',
          'Delete artist',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.artistsMenu) {
        case 'List artists': {
          console.log(artistsManager.preview());
          artistsMenu();
          break;
        }
        case 'List artist playlists': {
          const artistsDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
          const serialized = artistsDb.get('artists').value();
          const options = serialized
            .map((el: ArtistInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'selection',
                message: 'Select an artists to display playlists:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((artistOption) => {
              if (artistOption.selection === 'Go Back') {
                console.clear();
                artistsMenu();
              } else {
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      name: 'displayOption',
                      message: 'Select an option display for the playlists view:',
                      choices: [
                        'Alphabetically (asc)',
                        'Alphabetically (desc)',
                        new inquirer.Separator(),
                        'Go Back',
                      ],
                    },
                  ]).then((playListOption) => {
                    if (playListOption.displayOption === 'Go Back') {
                      console.clear();
                      artistsMenu();
                    } else {
                      const inx: number = artistsManager.artists
                        .map((artist) => artist.name)
                        .indexOf(artistOption.selection);
                      if (playListOption.displayOption === 'Alphabetically (asc)') {
                        console.log(artistsManager.viewArtistPlaylists(inx));
                        artistsMenu();
                      } else if (playListOption.displayOption === 'Alphabetically (desc)') {
                        console.log(artistsManager.viewArtistPlaylists(inx, true));
                        artistsMenu();
                      } else {
                        console.clear();
                        artistsMenu();
                      }
                    }
                  });
              }
            });
          break;
        }
        case 'List artist songs': {
          const artistsDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
          const serialized = artistsDb.get('artists').value();
          const options = serialized
            .map((el: ArtistInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'selection',
                message: 'Select an artist to display his songs:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((artistOption) => {
              if (artistOption.selection === 'Go Back') {
                console.clear();
                artistsMenu();
              } else {
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      name: 'displayOption',
                      message: 'Select an option display for the songs list:',
                      choices: [
                        'Alphabetically (asc)',
                        'Alphabetically (desc)',
                        'By number of views (asc)',
                        'By number of views (desc)',
                        'Only singles',
                        new inquirer.Separator(),
                        'Go Back',
                      ],
                    },
                  ]).then((playListOption) => {

                    const inx: number = artistsManager.artists
                      .map((artist) => artist.name)
                      .indexOf(artistOption.selection);
                    switch (playListOption.displayOption) {
                      case 'Go Back': {
                        console.clear();
                        artistsMenu();
                        break;
                      }
                      case 'Alphabetically (asc)': {
                        console.log(artistsManager.viewArtistSongs(inx));
                        artistsMenu();
                        break;
                      }
                      case 'Alphabetically (desc)': {
                        console.log(artistsManager.viewArtistSongs(inx, true));
                        artistsMenu();
                        break;
                      }
                      case 'By number of views (asc)': {
                        console.log(artistsManager.viewArtistSongsByViews(inx));
                        artistsMenu();
                        break;
                      }
                      case 'By number of views (desc)': {
                        console.log(artistsManager.viewArtistSongsByViews(inx, true));
                        artistsMenu();
                        break;
                      }
                      case 'Only Singles': {
                        console.log(artistsManager.viewArtistSongsSingles(inx));
                        artistsMenu();
                        break;
                      }
                      default: {
                        console.clear();
                        artistsMenu();
                      }
                    }
                  });
              }
            });
          break;
        }
        case 'List artist albums': {
          const artistsDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
          const serialized = artistsDb.get('artists').value();
          const options = serialized
            .map((el: ArtistInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'selection',
                message: 'Select an artist to display his albums:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((artistOption) => {
              if (artistOption.selection === 'Go Back') {
                console.clear();
                artistsMenu();
              } else {
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      name: 'displayOption',
                      message: 'Select an option display for the albums list:',
                      choices: [
                        'Alphabetically (asc)',
                        'Alphabetically (desc)',
                        'By number release year (asc)',
                        'By number release year (desc)',
                        'Only singles',
                        new inquirer.Separator(),
                        'Go Back',
                      ],
                    },
                  ]).then((playListOption) => {
                    const inx: number = artistsManager.artists
                      .map((artist) => artist.name)
                      .indexOf(artistOption.selection);
                    switch (playListOption.displayOption) {
                      case 'Go Back': {
                        console.clear();
                        artistsMenu();
                        break;
                      }
                      case 'Alphabetically (asc)': {
                        console.log(artistsManager.viewArtistAlbums(inx));
                        artistsMenu();
                        break;
                      }
                      case 'Alphabetically (desc)': {
                        console.log(artistsManager.viewArtistAlbums(inx, true));
                        artistsMenu();
                        break;
                      }
                      case 'By number release year (asc)': {
                        console.log(artistsManager.viewArtistAlbumsByRelease(inx));
                        artistsMenu();
                        break;
                      }
                      case 'By number release year (desc)': {
                        console.log(artistsManager.viewArtistAlbumsByRelease(inx, true));
                        artistsMenu();
                        break;
                      }
                      default: {
                        console.clear();
                        artistsMenu();
                      }
                    }
                  });
              }
            });
          break;
        }
        case 'Add new artist': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'addName',
                message: 'Type new name:',
              },
              {
                type: 'input',
                name: 'addGroups',
                message: 'Type groups separated only by commas:',
              },
              {
                type: 'input',
                name: 'addGenres',
                message: 'Type arist genres separated by spaces:',
              },
              {
                type: 'input',
                name: 'addAlbums',
                message: 'Type arist albums separated only by commas:',
              },
              {
                type: 'input',
                name: 'addSongs',
                message: 'Type arist songs separated only by commas:',
              },
              {
                type: 'input',
                name: 'addListeners',
                message: 'Type the listeners of the artist:',
                validate(value) {
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
            .then((queryAnswers) => {
              const newArtist: Artist = new Artist(
                queryAnswers.addName,
                queryAnswers.addGroups === '' ? [] : queryAnswers.addGroups.split(','),
                queryAnswers.addGenres === '' ? [] : queryAnswers.addGenres.split(' '),
                queryAnswers.addAlbums === '' ? [] : queryAnswers.addAlbums.split(','),
                queryAnswers.addSongs === '' ? [] : queryAnswers.addSongs.split(','),
                queryAnswers.addListeners === '' ? 0 : Number(queryAnswers.addListeners),
              );
              artistsManager.createArtist(newArtist);
              artistsMenu();
            });
          break;
        }
        case 'Save artist': {
          const artistsDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
          const serialized = artistsDb.get('artists').value();
          const options = artistsManager
            .artists
            .filter((artist) => !serialized
              .map((el: ArtistInterface) => el.name)
              .includes(artist.name))
            .map((el) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'artistSave',
                message: 'Select a song to save:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((queryAnswer) => {
              if (queryAnswer.artistSave === 'Go Back') {
                console.clear();
                artistsMenu();
              } else {
                const inx: number = artistsManager.artists
                  .map((artist) => artist.name)
                  .indexOf(queryAnswer.artistSave);
                artistsManager.saveArtist(inx);
                artistsMenu();
              }
            });
          break;
        }
        case 'Edit artist': {
          const artistsDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
          const serialized = artistsDb.get('artists').value();
          const options = serialized
            .filter((artist: ArtistInterface) => artist.origin === 'User')
            .map((el: ArtistInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'artistEdit',
                message: 'Select an artist to Edit:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go back',
                ],
              },
            ]).then((editArtistAnswer) => {
              if (editArtistAnswer.artistEdit === 'Go back') {
                console.clear();
                artistsMenu();
              } else {
                const inx: number = artistsManager.artists
                  .map((artist) => artist.name)
                  .indexOf(editArtistAnswer.songEdit);
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'editArtist',
                      message: 'Edit artist:',
                    },
                    {
                      type: 'input',
                      name: 'editGroups',
                      message: 'Edit groups:',
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
                      name: 'editSongs',
                      message: 'Edit songs:',
                    },
                    {
                      type: 'input',
                      name: 'editListeners',
                      message: 'Edit listeners:',
                      validate(value) {
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
                  .then((editArtistAnswers) => {
                    const newGroups: string[] = editArtistAnswers.editGroups === ''
                      ? editArtistAnswers.album(inx).groups
                      : editArtistAnswers.editGroups.split(',');
                    const newGenres: string[] = editArtistAnswers.editGenres === ''
                      ? editArtistAnswers.album(inx).genres
                      : editArtistAnswers.editGenres.split(' ');
                    const newAlbums: string[] = editArtistAnswers.editAlbums === ''
                      ? editArtistAnswers.album(inx).albums
                      : editArtistAnswers.editAlbums.split(',');
                    const newSongs: string[] = editArtistAnswers.editSongs === ''
                      ? editArtistAnswers.album(inx).songs
                      : editArtistAnswers.editSongs.split(',');
                    const newListeners: number = editArtistAnswers.editListeners === ''
                      ? editArtistAnswers.album(inx).listeners
                      : Number(editArtistAnswers.editListeners);
                    const newArtist: Artist = new Artist(
                      artistsManager.artist(inx).name,
                      newGroups,
                      newGenres,
                      newAlbums,
                      newSongs,
                      newListeners,
                    );
                    artistsManager.updateArtist(inx, newArtist);
                    artistsManager.saveArtist(inx, true);
                    artistsMenu();
                  });
              }
            });
          break;
        }
        case 'Delete artist': {
          const artistsDb: lowdb.LowdbSync <ArtistInterface> = lowdb(new FileSync('database/database-artists.json'));
          const serialized = artistsDb.get('artists').value();
          const numberOfUserSongs: number = serialized.filter((song: any) => song.origin === 'User').length;
          if (numberOfUserSongs > 0) {
            const options = serialized
              .filter((artist: ArtistInterface) => artist.origin === 'User')
              .map((el: ArtistInterface) => el.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'artistDelete',
                  message: 'Select an artist to Delete:',
                  choices: [
                    ...options,
                    new inquirer.Separator(),
                    'Go back',
                  ],
                },
              ])
              .then((deleteArtistAnswer) => {
                if (deleteArtistAnswer.songDelete === 'Go back') {
                  console.clear();
                  artistsMenu();
                } else {
                  const inx: number = artistsManager.artists
                    .map((artist) => artist.name)
                    .indexOf(deleteArtistAnswer.artistDelete);
                  artistsManager.deleteArtist(inx);
                  console.clear();
                  artistsMenu();
                }
              });
          } else {
            console.clear();
            console.log('No user artist in database, System artists are prohibited');
            artistsMenu();
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
