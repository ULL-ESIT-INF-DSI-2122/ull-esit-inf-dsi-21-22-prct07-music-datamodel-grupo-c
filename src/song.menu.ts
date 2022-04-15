import inquirer = require('inquirer');
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Song } from './song.class';
import { run } from './main'; // eslint-disable-line
import { SongInterface, SongsManager } from './songsManager.class';

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
              console.log(newSong);
              songMenu();
            });
          break;
        }
        case 'Save song': {
          const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
          const serialized = songsDb.get('songs').value();
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'songEdit',
                message: 'Select a song to save:',
                choices: songsManager
                  .songs
                  .filter((song) => !serialized
                    .map((el: SongInterface) => el.name)
                    .includes(song.name))
                  .map((el) => el.name),
              },
            ]).then((editSongAnswer) => {
              const inx: number = songsManager.songs
                .map((song) => song.name)
                .indexOf(editSongAnswer.songEdit);
              songsManager.saveSong(inx);
              songMenu();
            });
          break;
        }
        case 'Edit song': {
          const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
          const serialized = songsDb.get('songs').value();
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'songEdit',
                message: 'Select a song to Edit:',
                choices: songsManager
                  .songs
                  .filter((song) => !serialized
                    .map((el: SongInterface) => el.name)
                    .includes(song.name))
                  .map((el) => el.name),
              },
            ]).then((editSongAnswer) => {
              const inx: number = songsManager.songs
                .map((song) => song.name)
                .indexOf(editSongAnswer.songEdit);
              inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'editName',
                    message: 'Edit name:',
                  },
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
                  const newSong: Song = new Song(
                    editSongAnswers.editName,
                    editSongAnswers.editArtist,
                    Number(editSongAnswers.editSeconds),
                    [editSongAnswers.editGenres],
                    editSongAnswers.editSingle,
                    Number(editSongAnswers.editViews),
                  );
                  songsManager.updateSong(inx, newSong);
                  songMenu();
                });
            });
          break;
        }
        case 'Delete song': {
          const songsDb: lowdb.LowdbSync <SongInterface> = lowdb(new FileSync('database/database-songs.json'));
          const serialized = songsDb.get('songs').value();
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'songDelete',
                message: 'Select a song to Delete:',
                choices: serialized.map,
              },
            ])
            .then((deleteAnswer) => {
              console.log(deleteAnswer);
              songMenu();
            });
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
