import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Song } from './song.class';
import { run } from './main'; // eslint-disable-line
import SongsManager from './songsManager.class';
import { SongInterface } from './database.interfaces';

const songsManager: SongsManager = new SongsManager();
const songArray: Song[] = [];

export function songMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'songMenu',
        message: 'Choose an action:',
        choices: [
          'List all songs',
          'Add new song',
          'Save song',
          'Edit song',
          'Delete song',
          new inquirer.Separator(),
          'Go Back',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.songMenu) {
        case 'List all songs': {
          console.log(songsManager.preview());
          songMenu();
          break;
        }
        case 'Add new song': {
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'addName',
                message: 'Type new name:',
              },
              {
                type: 'input',
                name: 'addArtist',
                message: 'Type new artist:',
              },
              {
                type: 'input',
                name: 'addSeconds',
                message: 'Type new seconds:',
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
              {
                type: 'input',
                name: 'addGenres',
                message: 'Type new genres:',
              },
              {
                type: 'confirm',
                name: 'addSingle',
                message: 'Is a single?:',
              },
              {
                type: 'input',
                name: 'addViews',
                message: 'Type new views:',
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
            .then((newSongAnswers) => {
              const newSong: Song = new Song(
                newSongAnswers.addName,
                newSongAnswers.addArtist,
                Number(newSongAnswers.addSeconds),
                [newSongAnswers.addGenres],
                newSongAnswers.addSingle,
                Number(newSongAnswers.addViews),
              );
              songsManager.createSong(newSong);
              songArray.push(newSong);
              songMenu();
            });
          break;
        }
        case 'Save song': {
          const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
          const serialized = songsDb.get('songs').value();
          const options = songsManager
            .songs
            .filter((song) => !serialized
              .map((el: SongInterface) => el.name)
              .includes(song.name))
            .map((el) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'songSave',
                message: 'Select a song to save:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go Back',
                ],
              },
            ]).then((saveSongAnswer) => {
              if (saveSongAnswer.songSave === 'Go Back') {
                console.clear();
                songMenu();
              } else {
                const inx: number = songsManager.songs
                  .map((song) => song.name)
                  .indexOf(saveSongAnswer.songSave);
                songsManager.saveSong(inx);
                songMenu();
              }
            });
          break;
        }
        case 'Edit song': {
          const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
          const serialized = songsDb.get('songs').value();
          const options = serialized
            .filter((song: SongInterface) => song.origin === 'User')
            .map((el: SongInterface) => el.name);
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'songEdit',
                message: 'Select a song to Edit:',
                choices: [
                  ...options,
                  new inquirer.Separator(),
                  'Go back',
                ],
              },
            ]).then((editSongAnswer) => {
              if (editSongAnswer.songEdit === 'Go back') {
                console.clear();
                songMenu();
              } else {
                const inx: number = songsManager.songs
                  .map((song) => song.name)
                  .indexOf(editSongAnswer.songEdit);
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'editArtist',
                      message: 'Edit artist:',
                    },
                    {
                      type: 'input',
                      name: 'editSeconds',
                      message: 'Edit seconds:',
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
                    {
                      type: 'input',
                      name: 'editGenres',
                      message: 'Edit genres:',
                    },
                    {
                      type: 'confirm',
                      name: 'editSingle',
                      message: 'Is a single?:',
                    },
                    {
                      type: 'input',
                      name: 'editViews',
                      message: 'Edit views:',
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
                  .then((editSongAnswers) => {
                    let newArtistEdit: string = editSongAnswers.editArtist;
                    const auxSeconds: string = editSongAnswers.editSeconds;
                    let newSecondsEdit: number = Number(auxSeconds);
                    let newGenresEdit: string[] = [editSongAnswer.editGenres];
                    const auxViews: string = editSongAnswers.editViews;
                    let newViewsEdit: number = Number(auxViews);

                    if (newArtistEdit === '') {
                      newArtistEdit = songsManager.song(inx).artist;
                    }
                    if (auxSeconds === '') {
                      newSecondsEdit = Number(songsManager.song(inx).seconds);
                    }
                    if (newGenresEdit.length === 0) {
                      newGenresEdit = songsManager.song(inx).genres;
                    }
                    if (auxViews === '') {
                      newViewsEdit = Number(songsManager.song(inx).views);
                    }
                    const newSong: Song = new Song(
                      songsManager.song(inx).name,
                      newArtistEdit,
                      newSecondsEdit,
                      newGenresEdit,
                      editSongAnswers.editSingle,
                      newViewsEdit,
                    );
                    songsManager.updateSong(inx, newSong);
                    songsManager.saveSong(inx, true);
                    songMenu();
                  });
              }
            });
          break;
        }
        case 'Delete song': {
          const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
          const serialized = songsDb.get('songs').value();
          const numberOfUserSongs: number = serialized.filter((song: any) => song.origin === 'User').length;
          if (numberOfUserSongs > 0) {
            const options = serialized
              .filter((song: SongInterface) => song.origin === 'User')
              .map((el: SongInterface) => el.name);
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'songDelete',
                  message: 'Select a song to Delete:',
                  choices: [
                    ...options,
                    new inquirer.Separator(),
                    'Go back',
                  ],
                },
              ])
              .then((deleteSongAnswer) => {
                if (deleteSongAnswer.songDelete === 'Go back') {
                  console.clear();
                  songMenu();
                } else {
                  const inx: number = songsManager.songs
                    .map((song) => song.name)
                    .indexOf(deleteSongAnswer.songDelete);
                  songsManager.deleteSong(inx);
                  console.clear();
                  songMenu();
                }
              });
          } else {
            console.clear();
            console.log('No user song in database, System albums are prohibited');
            songMenu();
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
