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
              },
              {
                type: 'input',
                name: 'addGenres',
                message: 'Type new genres:',
              },
              {
                type: 'input',
                name: 'addSingle',
                message: 'Type new single:',
              },
              {
                type: 'input',
                name: 'addViews',
                message: 'Type new views:',
              },
            ])
            .then((newSongAnswers) => {
              const newSong: Song = new Song(
                newSongAnswers.addName,
                newSongAnswers.addArtist,
                newSongAnswers.addSeconds,
                newSongAnswers.addGenre,
                newSongAnswers.addSingle,
                newSongAnswers.addViews,
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
                name: 'songSave',
                message: 'Select a song to save:',
                choices: songsManager
                  .songs
                  .filter((song) => !serialized
                    .map((el: SongInterface) => el.name)
                    .includes(song.name))
                  .map((el) => el.name),
              },
            ]).then((saveSongAnswer) => {
              const inx: number = songsManager.songs
                .map((song) => song.name)
                .indexOf(saveSongAnswer.songSave);
              songsManager.saveSong(inx);
            });
          break;
        }
        case 'Edit song': {
          break;
        }
        case 'Delete song': {
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
